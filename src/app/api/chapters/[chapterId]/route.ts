import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";
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
