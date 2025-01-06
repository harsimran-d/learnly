import { Button } from "@/components/ui/button";
import Link from "next/link";

const CourseNavbar = () => {
  return (
    <div className="flex justify-end p-2">
      <Link href={`/browse`}>
        <Button variant={"outline"}>Back to courses</Button>
      </Link>
    </div>
  );
};

export default CourseNavbar;
