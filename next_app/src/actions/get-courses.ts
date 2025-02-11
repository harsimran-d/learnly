"use server";

import db, { Course } from "@/lib/db";

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
