import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import Link from "next/link";

const ListItem = ({ course }: { course: Course }) => {
  return (
    <div className="flex items-center space-x-2 border p-3">
      <div className="text-lg font-medium">{course.title}</div>
      <div className="flex-1"></div>
      <div>{course.status}</div>
      <Link href={`/teacher/courses/${course.id}`}>
        <Button variant="outline">Edit</Button>
      </Link>
    </div>
  );
};

export default ListItem;
