import { CustomUser } from "@/auth.config";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> },
) {
  try {
    const session = await auth();
    const user = session?.user as CustomUser;
    if (!user) {
      return NextResponse.json(null, { status: 401 });
    }
    if (user.role !== "TEACHER") {
      return NextResponse.json(
        { error: "Only teachers can create chapters" },
        { status: 403 },
      );
    }

    const { courseId } = await params;
    const { title } = await req.json();
    const totalChapters = await db.chapter.count({
      where: {
        courseId: courseId,
      },
    });
    const chapter = await db.chapter.create({
      data: {
        title,
        courseId: courseId,
        sequence: totalChapters + 1,
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(chapter, { status: 201 });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e ? "[POST,COURSES] " + e : "Unknown error happened");
    } else {
      console.error("[POST,COURSES] Unknown error happened");
    }

    return new NextResponse("Internal Error", { status: 500 });
  }
}
