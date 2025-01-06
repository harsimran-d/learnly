import { Course } from "@prisma/client";
import ListItem from "./list-item";

const CoursesList = ({ courses }: { courses: Course[] }) => {
  return (
    <div className="max-w-3xl">
      {!courses || courses.length === 0 ? (
        <div className="py-2 text-lg">No courses found</div>
      ) : (
        <div>
          <h1 className="py-2 text-xl">Your Courses</h1>
          {courses.map((course) => {
            return <ListItem key={course.id} course={course} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CoursesList;
