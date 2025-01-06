"use server";

import db from "@/lib/db";

export const getProgress = async (
  userId: string,
  courseId: string,
): Promise<number> => {
  try {
    const publishedChapterIds = (
      await db.chapter.findMany({
        where: {
          courseId,
          status: "PUBLISHED",
        },
        select: {
          id: true,
        },
      })
    ).map((chapter) => chapter.id);

    const completedChapters = await db.userChapterProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });
    return (completedChapters / publishedChapterIds.length) * 100;
  } catch (e) {
    console.log("GET PROGRESS ", e);
    return 0;
  }
};
