import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";

const WathcCourse = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  const firstChapter = await db.chapter.findFirst({
    where: {
      courseId,
      status: "PUBLISHED",
      UserChapterProgress: {
        none: {
          userId,
        },
      },
    },
    orderBy: {
      sequence: "asc",
    },
  });

  if (firstChapter) {
    redirect(`/courses/${courseId}/chapters/${firstChapter.id}`);
  } else {
    redirect("/");
  }
};

export default WathcCourse;
