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
  { params }: { params: Promise<{ courseId: string }> },
) {
  const { courseId } = await params;
  const { finalName } = await req.json();
  if (!finalName) {
    return NextResponse.json({ error: "Missing finalName" }, { status: 400 });
  }

  try {
    const old = await db.course.findFirst({
      where: {
        id: courseId,
      },
      select: {
        imageURL: true,
      },
    });

    const oldFilePath = old?.imageURL?.split("learnly.harsimran/").pop();
    if (oldFilePath) {
      const command = new DeleteObjectCommand({
        Bucket: "learnly.harsimran",
        Key: oldFilePath,
      });
      await s3Client.send(command);
    }

    const finalUrl = `https://s3.ap-south-1.amazonaws.com/learnly.harsimran/${finalName}`;
    await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        imageURL: finalUrl,
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
  { params }: { params: Promise<{ courseId: string }> },
) {
  const { fileType } = await req.json();
  const { courseId } = await params;
  if (!fileType) {
    return NextResponse.json({ error: "Missing fileType" }, { status: 400 });
  }
  const timestamp = Date.now();
  const extension = fileType.split("/")[1];
  const filePath = `uploads/course-${courseId}/cover-${timestamp}.${extension}`;

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
