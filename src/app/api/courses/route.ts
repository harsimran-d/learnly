import { CustomUser } from "@/auth.config";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = session?.user as CustomUser;
    if (!user) {
      return NextResponse.json(null, { status: 401 });
    }
    if (user.role !== "TEACHER") {
      return NextResponse.json(
        { error: "Only teachers can create courses" },
        { status: 403 },
      );
    }

    const { title } = await req.json();
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const { id } = user;
    if (!id) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }
    console.log("Creating course", title, id);
    const course = await db.course.create({
      data: {
        title,
        teacherId: id,
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e ? "[POST,COURSES] " + e : "Unknown error happened");
    } else {
      console.log("[POST,COURSES] Unknown error happened");
    }

    return new NextResponse("Internal Error", { status: 500 });
  }
}
