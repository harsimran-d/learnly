import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> },
) {
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
  try {
    const courseId = (await params).courseId;
    const courseOwned = await db.course.findUnique({
      where: {
        id: courseId,
        teacherId: userId,
      },
    });
    if (!courseOwned) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { list } = await req.json();

    for (const item of list) {
      await db.chapter.update({
        where: {
          id: item.id,
        },
        data: {
          sequence: item.sequence,
        },
      });
    }
    return new NextResponse("Success", { status: 200 });
  } catch (e) {
    console.log("[CHAPTER REORDER] ", e);
    return new NextResponse("Internatl server error", { status: 500 });
  }
}
