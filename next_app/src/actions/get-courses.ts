"use server";

import db from "@/lib/db";
import { Course } from "@prisma/client";

export const getCourses = async (): Promise<Course[]> => {
  try {
    return await db.course.findMany({
      where: {
        status: "PUBLISHED",
      },
    });
  } catch (e) {
    console.log("GET COURSES: ", e);
    return [];
  }
};
