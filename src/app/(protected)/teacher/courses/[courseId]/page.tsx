import { IconBadge } from "@/components/icon-badge";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { BookOpen, CircleDollarSign, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChaptersForm from "./_components/chapters-form";
import DescriptionForm from "./_components/description-form";
import ImageUploadForm from "./_components/image-upload-form";
import PriceForm from "./_components/price-form";
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
    include: {
      chapters: {
        select: {
          id: true,
          title: true,
          status: true,
          sequence: true,
        },
        orderBy: {
          sequence: "asc",
        },
      },
    },
  });

  if (!course) {
    return <div>Course not found</div>;
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageURL,
    course.price?.toString(),
    course.chapters.some((chapter) => chapter.status === "PUBLISHED"),
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
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
          <ImageUploadForm
            courseId={courseId}
            initialData={{ imageURL: course.imageURL || "" }}
          />
        </div>
        <div className="space-y-6">
          <div className="space-y-6">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={BookOpen} />
              <h2 className="text-xl">Chapters</h2>
              <div className="flex-1"></div>
              <Link href={`/teacher/courses/${courseId}/chapters/create`}>
                <Button variant={"outline"}>Create Chapter</Button>
              </Link>
            </div>
            <ChaptersForm
              initialData={{ chapters: course.chapters }}
              courseId={courseId}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl">Sell your Course</h2>
            </div>
            <PriceForm
              initialData={{ price: course.price ?? undefined }}
              courseId={courseId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
