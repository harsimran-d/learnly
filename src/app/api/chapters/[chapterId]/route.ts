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
  { params }: { params: Promise<{ chapterId: string }> },
) {
  try {
    const userId = (await auth())?.user?.id;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { chapterId } = await params;

    const deletedChapter = await db.chapter.delete({
      where: {
        id: chapterId,
        course: {
          teacherId: userId,
        },
      },
    });

    if (!deletedChapter) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const folderPath = `uploads/course-${deletedChapter.courseId}/chapter-${deletedChapter.id}/`;
    const contentsCommand = new ListObjectsV2Command({
      Bucket: "learnly.harsimran",
      Prefix: folderPath,
    });
    const listContents = await s3Client.send(contentsCommand);

    if (!listContents.Contents || listContents.Contents?.length == 0) {
      console.log("No objects found in the folder.", folderPath);
      return new NextResponse(null, { status: 204 });
    }
    const objectsToDelete = listContents.Contents.map((item) => ({
      Key: item.Key!,
    }));
    const command = new DeleteObjectsCommand({
      Bucket: "learnly.harsimran",
      Delete: { Objects: objectsToDelete },
    });
    await s3Client.send(command);
    console.log(`Folder ${folderPath} and all objects deleted successfully.`);
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: deletedChapter.courseId,
        status: "PUBLISHED",
      },
    });

    if (!publishedChapters.length) {
      await db.course.update({
        where: {
          id: deletedChapter.courseId,
        },
        data: {
          status: "DRAFT",
        },
      });
    }
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.error("[CHAPTER_ID DELETE] ", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ chapterId: string }> },
) {
  try {
    const userId = (await auth())?.user?.id;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { chapterId } = await params;
    const values = await req.json();

    await db.chapter.update({
      where: {
        id: chapterId,
        course: {
          teacherId: userId,
        },
      },
      data: {
        ...values,
      },
    });
    return new NextResponse("Chapter updated successfully", { status: 200 });
  } catch (e) {
    console.error("[CHAPTER_ID PATCH] ", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
