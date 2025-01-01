import { IconBadge } from "@/components/icon-badge";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import DescriptionForm from "./_components/description-form";
import TitleForm from "./_components/title-form";
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
  const completionText = `${completedFields}/${totalFields}`;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span>Complete all fields {completionText}</span>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm
            initialData={{ title: course.title }}
            courseId={courseId}
          />
          <DescriptionForm
            initialData={{ description: course.description ?? "" }}
            courseId={courseId}
          />
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
