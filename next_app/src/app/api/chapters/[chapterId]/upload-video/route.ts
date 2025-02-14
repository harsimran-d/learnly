import db from "@/lib/db";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from "axios";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET!,
  },
});

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ chapterId: string }> },
) {
  const { chapterId } = await params;
  try {
    const oldVideo = await db.video.findFirst({
      where: {
        chapterId,
      },
    });
    const oldFilePath = oldVideo?.rawUrl?.split("learnly.harsimran/").pop();
    if (oldFilePath) {
      console.log("trying to delete key ", oldFilePath);
      const command = new DeleteObjectCommand({
        Bucket: "learnly.harsimran",
        Key: oldFilePath,
      });
      await s3Client.send(command);
    }
    if (oldVideo?.pendingRawUrl) {
      await db.video.update({
        data: {
          rawUrl: oldVideo?.pendingRawUrl,
          status: "UPLOADED",
          pendingRawUrl: null,
        },
        where: {
          chapterId,
        },
      });

      const processResponse = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL! + "/video-api/process",
        {
          videoId: oldVideo.id,
        },
      );
      console.log(processResponse.data);
      return NextResponse.json(
        { message: "Video URL Stored successfully" },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: "Uplaoded video url not found" },
        { status: 404 },
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 },
    );
  }
}
export async function POST(
  req: Request,
  { params }: { params: Promise<{ chapterId: string }> },
) {
  const { fileType, courseId } = await req.json();
  const { chapterId } = await params;
  if (!fileType || !courseId || !chapterId) {
    return NextResponse.json(
      { error: "Missing fileType or courseId or chapterId" },
      { status: 400 },
    );
  }
  const timestamp = Date.now();
  const extension =
    fileType === "video/quicktime" ? "mov" : fileType.split("/")[1];
  const fileName = `uploads/course-${courseId}/chapter-${chapterId}/video-${timestamp}.${extension}`;
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 5,
    });
    const pendingRawUrl = `https://s3.ap-south-1.amazonaws.com/learnly.harsimran/${fileName}`;

    await db.video.upsert({
      create: {
        chapterId,
        pendingRawUrl,
      },
      update: {
        pendingRawUrl,
      },
      where: {
        chapterId,
      },
    });

    return NextResponse.json({ url: presignedUrl }, { status: 200 });
  } catch (err) {
    console.error("Error generating presigned URL:", err);
    return NextResponse.json(
      { error: "Failed to generate presigned URL" },
      { status: 500 },
    );
  }
}
