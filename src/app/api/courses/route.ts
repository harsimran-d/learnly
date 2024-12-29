import { CustomUser } from "@/auth.config";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

  const body = await req.json();

  console.log(body);
  console.log("request came to create a course");

  return NextResponse.json({ error: "somethign went wrong" });
}
