import { auth } from "@/lib/auth";
import db from "@/lib/db";
import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET!,
  },
});

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> },
) {
  try {
    const userId = (await auth())?.user?.id;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { courseId } = await params;

    const deletedCourse = await db.course.delete({
      where: {
        id: courseId,
        teacherId: userId,
      },
    });

    if (!deletedCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const folderPath = `uploads/course-${courseId}/`;

    const listCommand = new ListObjectsV2Command({
      Bucket: "learnly.harsimran",
      Prefix: folderPath,
    });

    const listResponse = await s3Client.send(listCommand);

    if (!listResponse.Contents || listResponse.Contents.length === 0) {
      console.log("No objects found in the folder.", folderPath);
      return new NextResponse(null, { status: 204 });
    }

    const objectsToDelete = listResponse.Contents.map((item) => ({
      Key: item.Key!,
    }));

    const deleteCommand = new DeleteObjectsCommand({
      Bucket: "learnly.harsimran",
      Delete: { Objects: objectsToDelete },
    });

    await s3Client.send(deleteCommand);

    console.log(`Folder ${folderPath} and all objects deleted successfully.`);
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.error("[COURSE_ID DELETE] ", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> },
) {
  try {
    const userId = (await auth())?.user?.id;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { courseId } = await params;
    const values = await req.json();

    await db.course.update({
      where: {
        id: courseId,
        teacherId: userId,
      },
      data: {
        ...values,
      },
    });
    return new NextResponse("Course updated successfully", { status: 200 });
  } catch (e) {
    console.error("[COURSE_ID PATCH] ", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
