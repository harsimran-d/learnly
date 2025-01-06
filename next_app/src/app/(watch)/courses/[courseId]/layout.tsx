import { getProgress } from "@/actions/get-progress";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import CourseNavbar from "./_components/course-navbar";
import CourseSidebar from "./_components/course-sidebar";

const CourseWatchLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      status: "PUBLISHED",
    },
    include: {
      chapters: {
        include: {
          UserChapterProgress: {
            where: {
              userId,
            },
          },
        },
        where: {
          status: "PUBLISHED",
        },
        orderBy: {
          sequence: "asc",
        },
      },
    },
  });
  if (!course) {
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
  const progressCount = await getProgress(userId, courseId);

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-50 h-[80px] w-full md:pl-80">
        <CourseNavbar />
      </div>
      <div className="fixed inset-y-0 z-50 hidden h-full w-80 flex-col md:flex">
        <CourseSidebar
          userEnrolled={!!userEnrolled}
          course={course}
          progress={progressCount}
        />
      </div>
      <main className="h-full pt-[80px] md:pl-80">{children}</main>
    </div>
  );
};

export default CourseWatchLayout;
