import { $Enums } from "@prisma/client";

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
const ChaptersForm = ({ initialData }: ChaptersFormProps) => {
  return (
    <div className="rounded-md border bg-slate-100 p-6">
      {initialData.chapters.length === 0 ? (
        <p className="text-sm italic text-slate-400">
          Please add at least 1 chapter
        </p>
      ) : (
        // TODO: Make the list better and make chapters editable
        <p>There are {initialData.chapters.length} chapters in this course</p>
      )}
    </div>
  );
};

export default ChaptersForm;
