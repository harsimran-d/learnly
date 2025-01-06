import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";

const ChapterPlayer = async ({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string }>;
}) => {
  const { courseId, chapterId } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return redirect("/");
  }
  const userEnrolled = await db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      status: "PUBLISHED",
      course: {
        status: "PUBLISHED",
      },
    },
  });
  if (!chapter) {
    return redirect("/");
  }

  if (!chapter?.isFree && !userEnrolled) {
    redirect(`/enroll/${courseId}`);
  }

  return (
    <>
      <div className="aspect-video w-full p-6">
        {chapter?.videoUrl && (
          <video className="h-full w-full object-contain" controls={true}>
            <source src={chapter?.videoUrl} />
          </video>
        )}
      </div>
    </>
  );
};

export default ChapterPlayer;
