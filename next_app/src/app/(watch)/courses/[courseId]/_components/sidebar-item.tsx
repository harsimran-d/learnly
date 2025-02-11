"use client";
import { cn } from "@/lib/utils";
import { Chapter } from "@/lib/db";
import { CircleCheck, Lock, Play } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const SidebarItem = ({
  chapter,
  courseId,
  userEnrolled,
  completed,
}: {
  chapter: Chapter;
  courseId: string;
  userEnrolled: boolean;
  completed: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isSelected = pathname?.includes(chapter.id);
  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${chapter.id}`);
  };
  return (
    <div className="flex">
      <button
        onClick={onClick}
        className={cn(
          "flex w-full space-x-2 p-4 text-lg",
          isSelected && "bg-slate-200",
        )}
      >
        {!chapter.isFree && !userEnrolled ? (
          <Lock />
        ) : completed ? (
          <CircleCheck />
        ) : (
          <Play />
        )}
        <p>{chapter.title}</p>
      </button>
      {isSelected && <div className="ml-auto border-[3px] border-black"></div>}
    </div>
  );
};

export default SidebarItem;
