"use client";
import { Button } from "@/components/ui/button";
import { PublishStatus } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface ChapterActionsProps {
  disabled: boolean;
  chapterId: string;
  chapterStatus: PublishStatus;
}
const ChapterActions = ({
  disabled,
  chapterId,
  chapterStatus,
}: ChapterActionsProps) => {
  const router = useRouter();
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
        <Button disabled={disabled} onClick={() => updateStatus("PUBLISHED")}>
          Publish
        </Button>
      )}
      {chapterStatus !== "DRAFT" && (
        <Button disabled={disabled} onClick={() => updateStatus("DRAFT")}>
          Draft
        </Button>
      )}
      {chapterStatus !== "ARCHIVED" && (
        <Button disabled={disabled} onClick={() => updateStatus("ARCHIVED")}>
          Archive
        </Button>
      )}
      <Button variant={"destructive"}>
        <Trash />
      </Button>
    </div>
  );
};

export default ChapterActions;
