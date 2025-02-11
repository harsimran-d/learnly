import { Chapter, Course, UserChapterProgress } from "@/lib/db";
import SidebarItem from "./sidebar-item";

const CourseSidebar = ({
  userEnrolled,
  course,
}: {
  userEnrolled: boolean;
  course: Course & {
    chapters: (Chapter & { UserChapterProgress: UserChapterProgress[] })[];
  };
  progress: number;
}) => {
  return (
    <div className="h-full border">
      <div className="flex justify-center border p-4 text-xl font-medium">
        {course.title}
      </div>
      {course.chapters.map(
        (chapter: Chapter & { UserChapterProgress: UserChapterProgress[] }) => (
          <SidebarItem
            key={chapter.id}
            chapter={chapter}
            courseId={course.id}
            userEnrolled={userEnrolled}
            completed={chapter.UserChapterProgress[0]?.isCompleted || false}
          />
        ),
      )}
    </div>
  );
};

export default CourseSidebar;
