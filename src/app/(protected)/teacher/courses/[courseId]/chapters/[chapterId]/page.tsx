import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";

const EditChapter = async ({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) => {
  const chapterId = (await params).chapterId;
  const session = await auth();
  if (!session?.user) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      course: {
        teacherId: session.user.id,
      },
    },
  });
  if (!chapter) {
    return <div>Chapter not found</div>;
  }

  return (
    <div className="p-6">
      <Link href={`/teacher/courses/${chapter.courseId}`}>
        <Button variant={"ghost"}>
          <ArrowLeft /> Back to course
        </Button>
      </Link>
      <div className="flex flex-col">
        <h1 className="text-xl">Edit Chapter</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <TitleForm
              chapterId={chapterId}
              initialData={{ title: chapter.title }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditChapter;
