import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

const getStatusClasses = (status: $Enums.PublishStatus) => {
  switch (status) {
    case "DRAFT":
      return "bg-blue-200 text-blue-700";
    case "PUBLISHED":
      return "bg-green-200 text-green-700";
    case "ARCHIVED":
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-white text-black";
  }
};

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
              <div className="flex items-center">
                <div
                  className={cn(
                    "rounded-xl px-2 py-1 text-xs",
                    getStatusClasses(chapter.status),
                  )}
                >
                  {chapter.status}
                </div>
                <Link
                  href={`/teacher/courses/${courseId}/chapters/${chapter.id}`}
                >
                  <Button variant="ghost">Edit</Button>
                </Link>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChaptersForm;
