import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/video/VideoPlayer";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
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
    return (
      <div className="flex h-2/3 w-full items-center justify-center">
        <div className="h-120 w-200 flex flex-col items-center justify-center space-y-2 rounded-lg bg-blue-200 p-20">
          <Lock size={48} />
          <h1 className="text-2xl font-medium">Content Locked</h1>
          <p>
            To get access to this lesson, you&apos;ll need to purchase the
            course
          </p>
          <div className="h-2"></div>
          <Link href={`/enroll/${courseId}`}>
            <Button size={"xl"}>
              Buy Now
              <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  const video = await db.video.findFirst({
    where: {
      chapterId,
    },
  });
  if (!video?.masterUrl) {
    return (
      <div className="flex h-2/3 w-full items-center justify-center">
        <div className="h-120 w-200 flex flex-col items-center justify-center space-y-2 rounded-lg bg-blue-200 p-20">
          <Lock size={48} />
          <h1 className="text-2xl font-medium">Content Not available yet</h1>
          <p>
            Check back later or contact the course instructor for more
            information
          </p>
          <div className="h-2"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="aspect-video w-full p-6">
      <VideoPlayer src={video?.masterUrl} />
    </div>
  );
};

export default ChapterPlayer;
