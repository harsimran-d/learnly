import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { ImageIcon, SearchX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth();
  const userId = session?.user?.id;
  const courses = await db.course.findMany({
    where: {
      enrollments: {
        some: {
          userId,
        },
      },
    },
  });

  if (courses.length == 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="flex h-60 w-60 items-center justify-center rounded-md bg-slate-300">
          <SearchX />
        </div>
        <div>
          It looks a bit empty here. Enroll in some courses to start learning.
        </div>
      </div>
    );
  }
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {courses.map((course) => {
          return (
            <div
              key={course.id}
              className="max-w-min rounded-lg bg-slate-50 shadow-lg"
            >
              {course.imageURL == "" ? (
                <div className="flex h-60 w-80 items-center justify-center rounded-md bg-slate-200">
                  <ImageIcon className="h-10 w-10 text-slate-500" />
                </div>
              ) : (
                <div className="relative h-60 w-80 rounded-t-lg border">
                  <Image
                    src={course.imageURL!}
                    alt="course image"
                    fill
                    className="rounded-t-lg object-contain"
                  />
                </div>
              )}
              <div>
                <div className="flex items-center justify-between p-2">
                  <div className="font-semibold">{course.title}</div>
                  <Link href={`/courses/${course.id}`}>
                    <Button className="font-semibold">Start</Button>
                  </Link>
                </div>
                <p className="text-wrap break-words p-2 text-sm">
                  {course.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
