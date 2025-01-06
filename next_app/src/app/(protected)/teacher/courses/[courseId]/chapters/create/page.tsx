import { CreateChapterForm } from "@/components/courses/create-chapter-form";

const CreateChapter = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const courseId = (await params).courseId;
  return (
    <div>
      <CreateChapterForm courseId={courseId} />
    </div>
  );
};

export default CreateChapter;
