"use client";
import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { PublishStatus } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface ChapterActionsProps {
  isNotPublishable: boolean;
  chapterId: string;
  chapterStatus: PublishStatus;
  courseId: string;
}
const ChapterActions = ({
  isNotPublishable,
  chapterId,
  chapterStatus,
  courseId,
}: ChapterActionsProps) => {
  const router = useRouter();
  const deleteChapter = async () => {
    try {
      const response = await axios.delete(`/api/chapters/${chapterId}`);
      if (response.status == 204) {
        toast.success("Chapter delete successfully");
        router.push(`/teacher/courses/${courseId}`);
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to delete chapter");
    }
  };
  const updateStatus = async (status: PublishStatus) => {
    try {
      const response = await axios.post(
        `/api/chapters/${chapterId}/update-status`,
        { status },
      );
      if (response.status == 200) {
        toast.success(`Course ${status} successfully `);
      } else {
        toast.error("Failed to update course status");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to update course status");
    } finally {
      router.refresh();
    }
  };
  return (
    <div className="flex space-x-2">
      {chapterStatus !== "PUBLISHED" && (
        <Button
          variant={"outline"}
          disabled={isNotPublishable}
          onClick={() => updateStatus("PUBLISHED")}
        >
          Publish
        </Button>
      )}
      {chapterStatus !== "DRAFT" && (
        <Button variant={"outline"} onClick={() => updateStatus("DRAFT")}>
          Draft
        </Button>
      )}
      {chapterStatus !== "ARCHIVED" && (
        <Button variant={"outline"} onClick={() => updateStatus("ARCHIVED")}>
          Archive
        </Button>
      )}
      <ConfirmModal onConfirm={deleteChapter}>
        <Button variant={"destructive"}>
          <Trash />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
