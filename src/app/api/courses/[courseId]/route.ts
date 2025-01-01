import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";
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
