import db from "@/lib/db";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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
  const { finalName } = await req.json();
  if (!finalName) {
    return NextResponse.json({ error: "Missing finalName" }, { status: 400 });
  }

  try {
    const old = await db.chapter.findFirst({
      where: {
        id: chapterId,
      },
      select: {
        videoUrl: true,
      },
    });
    const fileName = old?.videoUrl?.split("learnly.harsimran/").pop();
    if (fileName) {
      console.log("trying to delete key ", fileName);
      const command = new DeleteObjectCommand({
        Bucket: "learnly.harsimran",
        Key: fileName,
      });
      s3Client.send(command);
    }

    const finalUrl = `https://s3.ap-south-1.amazonaws.com/learnly.harsimran/${finalName}`;
    await db.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        videoUrl: finalUrl,
      },
    });
    return NextResponse.json(
      { message: "Video URL Stored successfully" },
      { status: 200 },
    );
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
  const { fileType } = await req.json();
  const { chapterId } = await params;
  if (!fileType) {
    return NextResponse.json({ error: "Missing fileType" }, { status: 400 });
  }
  const timestamp = Date.now();
  const extension = fileType.split("/")[1];
  const fileName = `uploads/${chapterId}/video-${timestamp}.${extension}`;
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 5,
    });

    return NextResponse.json(
      { url: presignedUrl, finalName: fileName },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error generating presigned URL:", err);
    return NextResponse.json(
      { error: "Failed to generate presigned URL" },
      { status: 500 },
    );
  }
}
