import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { PublishStatus } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ courseId: string }> },
) => {
  try {
    const { status } = await req.json();
    if (!status || !Object.values(PublishStatus).includes(status)) {
      return NextResponse.json("Invlaid request", { status: 400 });
    }
    const courseId = (await params).courseId;
    const session = await auth();
    const userId = session?.user?.id;
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        teacherId: userId,
      },
    });
    if (!courseOwner) {
      console.log("accessed by non owner");
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    if (status !== PublishStatus.PUBLISHED) {
      await db.course.update({
        where: {
          id: courseId,
          teacherId: userId,
        },
        data: {
          status: status,
        },
      });
      return NextResponse.json("Status updated successfully", { status: 200 });
    } else {
      const publishedChapters = await db.chapter.findMany({
        where: {
          courseId: courseOwner.id,
          status: "PUBLISHED",
        },
      });
      if (!publishedChapters.length) {
        return NextResponse.json("Cannot publish partial course", {
          status: 401,
        });
      }
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          status: status,
        },
      });
      return NextResponse.json("Status updated successfully", { status: 200 });
    }
  } catch (e) {
    console.log("[UPDATE STATUS CourseID] ", e);
    return new NextResponse("Internal Server Error");
  }
};
