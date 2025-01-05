"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export const startCourse = async (formData: FormData): Promise<void> => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return redirect(`/login`);
  }
  const courseId = formData.get("courseId")?.toString();
  if (!courseId) {
    return redirect("/");
  }

  const enrolled = await db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  if (!enrolled) {
    await db.enrollment.create({
      data: {
        userId,
        courseId,
      },
    });
  }
  redirect(`/courses/${courseId}`);
};
