import { IconBadge } from "@/components/icon-badge";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { ArrowLeft, Eye, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChapterAccessForm from "./_components/chapter-access-form";
import DescriptionForm from "./_components/description-form";
import ImageUploadForm from "./_components/image-upload-form";
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
  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.imageUrl,
    chapter.videoUrl || chapter.notionDoc,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completedText = `Complete all fields before publishing ${completedFields}/${totalFields}`;
  return (
    <div className="p-6">
      <Link href={`/teacher/courses/${chapter.courseId}`}>
        <Button variant={"ghost"}>
          <ArrowLeft /> Back to course
        </Button>
      </Link>
      <div className="flex flex-col">
        <h1 className="text-xl">Edit Chapter</h1>
        <p className="mt-1 text-sm">{completedText}</p>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <div className="flex items-center space-x-2">
                <IconBadge icon={LayoutDashboard} />
                <div>Customize Chapter</div>
              </div>
            </div>
            <TitleForm
              chapterId={chapterId}
              initialData={{ title: chapter.title }}
            />
            <DescriptionForm
              chapterId={chapterId}
              initialData={{ description: chapter.description || "" }}
            />
            <ImageUploadForm
              chapterId={chapterId}
              initialData={{ imageURL: chapter.imageUrl || "" }}
            />
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center space-x-2">
                <IconBadge icon={Eye} />
                <div>Chapter Access</div>
              </div>
            </div>
            <ChapterAccessForm
              chapterId={chapterId}
              initialData={{ isFree: chapter.isFree }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditChapter;
