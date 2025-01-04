import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { PublishStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ chapterId: string }> },
) => {
  try {
    const { status } = await req.json();

    if (!status || !Object.values(PublishStatus).includes(status)) {
      return NextResponse.json("Invlaid request", { status: 400 });
    }
    const chapterId = (await params).chapterId;
    const session = await auth();
    const userId = session?.user?.id;

    const chapterOwner = await db.chapter.findUnique({
      where: {
        id: chapterId,
        course: {
          teacherId: userId,
        },
      },
    });
    if (!chapterOwner) {
      console.log("accessed by non owner");
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    if (
      status !== PublishStatus.PUBLISHED ||
      (chapterOwner.title &&
        chapterOwner.description &&
        chapterOwner.imageUrl &&
        chapterOwner.videoUrl &&
        status === PublishStatus.PUBLISHED)
    ) {
      await db.chapter.update({
        where: {
          id: chapterId,
          course: {
            teacherId: userId,
          },
        },
        data: {
          status: status,
        },
      });
      if (status == PublishStatus.ARCHIVED || PublishStatus.DRAFT) {
        const publishedChapters = await db.chapter.findMany({
          where: {
            courseId: chapterOwner.courseId,
            status: "PUBLISHED",
          },
        });
        if (!publishedChapters.length) {
          await db.course.update({
            where: {
              id: chapterOwner.courseId,
            },
            data: {
              status: "DRAFT",
            },
          });
        }
      }
      return NextResponse.json("Status updated successfully", { status: 200 });
    } else {
      console.log("tried to publish partial chapter");
      return NextResponse.json("Cannot publish partial chapter", {
        status: 401,
      });
    }
  } catch (e) {
    console.log("[UPDATE STATUS CHAPTERID] ", e);
    return new NextResponse("Sorry for now");
  }
};
