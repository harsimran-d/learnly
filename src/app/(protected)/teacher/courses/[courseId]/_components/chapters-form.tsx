import { Button } from "@/components/ui/button";
import { $Enums } from "@prisma/client";
import Link from "next/link";

interface ChaptersFormProps {
  courseId: string;
  initialData: {
    chapters: {
      id: string;
      title: string;
      status: $Enums.PublishStatus;
      sequence: number;
    }[];
  };
}
const ChaptersForm = ({ courseId, initialData }: ChaptersFormProps) => {
  return (
    <div className="rounded-md border bg-slate-100 p-6">
      {initialData.chapters.length === 0 ? (
        <p className="text-sm italic text-slate-400">
          Please add at least 1 chapter
        </p>
      ) : (
        initialData.chapters.map((chapter) => {
          return (
            <div key={chapter.id} className="flex items-center justify-between">
              <p>{chapter.title}</p>
              <Link
                href={`/teacher/courses/${courseId}/chapters/${chapter.id}`}
              >
                <Button variant="ghost">Edit</Button>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChaptersForm;
