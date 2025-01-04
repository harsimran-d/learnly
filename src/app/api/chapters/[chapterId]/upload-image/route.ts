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
        imageUrl: true,
      },
    });
    const oldFilePath = old?.imageUrl?.split("learnly.harsimran/").pop();
    if (oldFilePath) {
      console.log("deleting from s3 filepath: ", oldFilePath);
      const command = new DeleteObjectCommand({
        Bucket: "learnly.harsimran",
        Key: oldFilePath,
      });
      await s3Client.send(command);
    }

    const finalUrl = `https://s3.ap-south-1.amazonaws.com/learnly.harsimran/${finalName}`;
    await db.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        imageUrl: finalUrl,
      },
    });
    return NextResponse.json(
      { message: "Image URL Stored successfully" },
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
  const { fileType, courseId } = await req.json();
  const { chapterId } = await params;
  if (!fileType || !courseId || !chapterId) {
    return NextResponse.json(
      { error: "Missing fileType or courseId or chapterId" },
      { status: 400 },
    );
  }
  const timestamp = Date.now();
  const extension = fileType.split("/")[1];
  const filePath = `uploads/course-${courseId}/chapter-${chapterId}/cover-${timestamp}.${extension}`;
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: filePath,
      ContentType: fileType,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 5,
    });

    return NextResponse.json(
      { url: presignedUrl, finalName: filePath },
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
