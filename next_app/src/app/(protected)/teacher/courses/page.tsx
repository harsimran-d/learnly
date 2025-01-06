import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import CoursesList from "./_components/courses-list";

const Courses = async () => {
  const session = await auth();
  if (!session?.user) {
    return redirect("/");
  }
  const courses = await db.course.findMany({
    where: {
      teacherId: session?.user?.id,
    },
  });

  return (
    <div className="p-2">
      <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link>
      <CoursesList courses={courses} />
    </div>
  );
};
export default Courses;
