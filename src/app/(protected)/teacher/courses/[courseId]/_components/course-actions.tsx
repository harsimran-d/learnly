"use client";
import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { PublishStatus } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface CourseActionsProps {
  courseId: string;
  courseStatus: PublishStatus;
  isNotPublishable: boolean;
}
const CourseActions = ({
  courseId,
  courseStatus,
  isNotPublishable,
}: CourseActionsProps) => {
  const router = useRouter();
  const deleteCourse = async () => {
    try {
      const response = await axios.delete(`/api/courses/${courseId}`);
      if (response.status == 204) {
        toast.success("Course delete successfully");
        router.push(`/teacher/courses`);
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to delete course");
    }
  };
  const updateStatus = async (status: PublishStatus) => {
    try {
      const response = await axios.post(
        `/api/courses/${courseId}/update-status`,
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
      {courseStatus !== "PUBLISHED" && (
        <Button
          variant={"outline"}
          disabled={isNotPublishable}
          onClick={() => updateStatus("PUBLISHED")}
        >
          Publish
        </Button>
      )}
      {courseStatus !== "DRAFT" && (
        <Button variant={"outline"} onClick={() => updateStatus("DRAFT")}>
          Draft
        </Button>
      )}
      {courseStatus !== "ARCHIVED" && (
        <Button variant={"outline"} onClick={() => updateStatus("ARCHIVED")}>
          Archive
        </Button>
      )}
      <ConfirmModal onConfirm={deleteCourse}>
        <Button variant={"destructive"}>
          <Trash />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default CourseActions;
