import { getCourses } from "@/actions/get-courses";
import { formatPrice } from "@/lib/format";
import { ImageIcon, SearchX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default async function Browse() {
  const courses = await getCourses();
  if (courses.length == 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="flex h-60 w-60 items-center justify-center rounded-md bg-slate-300">
          <SearchX />
        </div>
        <div>
          It looks a bit empty here. Checkout later when some courses are
          published
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-6xl p-6">
      <div className="grid grid-cols-1 items-center justify-center sm:grid-cols-2 md:grid-cols-3">
        {courses.map((course) => {
          return (
            <div
              key={course.id}
              className="max-w-min items-center justify-center rounded-lg bg-slate-50 shadow-lg"
            >
              <Link
                href={`/browse/course/${course.id}`}
                className="m-auto flex flex-col justify-center"
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
                  <div className="flex justify-between p-2">
                    <div className="font-semibold">{course.title}</div>
                    <div className="font-semibold">
                      {formatPrice(course.price!)}
                    </div>
                  </div>
                  <p className="text-wrap break-words p-2 text-sm">
                    {course.description}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
