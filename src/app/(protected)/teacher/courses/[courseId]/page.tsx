import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
const EditCourse = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const courseId = (await params).courseId;
  const session = await auth();
  if (!session?.user) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: courseId,
      teacherId: session?.user?.id,
    },
  });

  if (!course) {
    return <div>Course not found</div>;
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageURL,
    course.price,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter((field) => field).length;
  const completionText = `${completedFields} / ${totalFields}`;
  return (
    <div>
      Edit Course {courseId} - {completionText}
    </div>
  );
};

export default EditCourse;
