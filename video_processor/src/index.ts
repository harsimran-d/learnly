import express from "express";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
import util from "util";
import { pipeline, Readable } from "stream";
import { authMiddleware } from "./middleware/auth";
import { prisma } from "db";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import "dotenv/config";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET!,
  },
});
const bucket = process.env.AWS_S3_BUCKET_NAME!;

const execPromise = util.promisify(exec);
const pipelinePromise = util.promisify(pipeline);
const app = express();
app.use(express.json());
app.post("/video-api/process", authMiddleware, async (req, res) => {
  const { videoId } = req.body;
  if (!videoId) {
    res.status(400).json({ message: "Warning: Invalid videoId" });
    return;
  }
  processVideo(videoId).catch((error) => {
    console.error("Error processing video:", error);
  });
  res.status(200).json({ message: "Video processing started", videoId });
});
async function processVideo(videoId: string) {
  const tmpDir = path.join(__dirname, "tmp");

  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  try {
    // Fetch video metadata from Prisma
    const video = await prisma.video.findUnique({ where: { id: videoId } });
    if (!video || !video.rawUrl) {
      throw new Error("Video not found or missing raw URL");
    }
    // Mark video as processing
    await prisma.video.update({
      where: { id: videoId },
      data: { status: "PROCESSING" },
    });
    // Download video from S3
    const fileName = path.basename(video.rawUrl);
    const localPath = path.join(__dirname, "tmp", fileName);
    await downloadFromS3(video.rawUrl, localPath);
    // Process video using FFmpeg for HLS
    const outputDir = path.join(__dirname, "tmp", videoId);
    fs.mkdirSync(outputDir, { recursive: true });
    const masterFile = await convertToHLS(localPath, outputDir);
    // Upload processed files to S3
    const hlsFiles = await uploadToS3(outputDir, `processed-videos/${videoId}`);
    // Clean up local files
    fs.unlinkSync(localPath);
    fs.rmSync(outputDir, { recursive: true, force: true });
    // Update Prisma with processed video URLs
    await prisma.video.update({
      where: { id: videoId },
      data: {
        status: "DONE",
        masterUrl: hlsFiles.master,
        pendingRawUrl: video.rawUrl,
      },
    });
  } catch (error) {
    console.error("Error in video processing:", error);
    await prisma.video.update({
      where: { id: videoId },
      data: { status: "FAILED" },
    });
  }
}

async function downloadFromS3(s3Url: string, localPath: string) {
  console.log("Downloading from S3:", s3Url);
  console.log("Saving to local path:", localPath);
  const key = s3Url.split(`${bucket}/`)[1];
  if (!key) {
    throw new Error("Invalid S3 URL");
  }
  const params = { Bucket: bucket, Key: key };

  const fileStream = fs.createWriteStream(localPath);
  const { Body } = await s3Client.send(new GetObjectCommand(params));
  if (!Body || !(Body instanceof Readable)) {
    throw new Error("No data in S3 object or incorrect stream type");
  }
  await pipelinePromise(Body, fileStream);
}

async function convertToHLS(inputPath: string, outputDir: string) {
  const masterFile = path.join(outputDir, "master.m3u8");
  const command = `ffmpeg -i ${inputPath} -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${masterFile}`;
  await execPromise(command);
  return masterFile;
}

async function uploadToS3(localDir: string, s3Prefix: string) {
  const files = fs.readdirSync(localDir);
  const uploadedFiles: { [key: string]: string } = {};

  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(localDir, file);
      const s3Key = `${s3Prefix}/${file}`;
      const params = {
        Bucket: bucket,
        Key: s3Key,
        Body: fs.createReadStream(filePath),
        ContentType: file.endsWith(".m3u8")
          ? "application/vnd.apple.mpegurl"
          : "video/MP2T",
      };
      await s3Client.send(new PutObjectCommand(params));
      if (file === "master.m3u8") {
        uploadedFiles.master = `https://s3.ap-south-1.amazonaws.com/learnly.harsimran/${s3Key}`;
      }
    })
  );
  return uploadedFiles;
}

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
