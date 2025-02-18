import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { ArrowLeft, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function CourseInfo({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        where: {
          status: "PUBLISHED",
        },
      },
    },
  });
  if (!course) {
    redirect("/");
  }
  return (
    <div className="h-full space-y-2 bg-slate-100 p-6">
      <Link href="/browse">
        <Button variant="outline">
          <ArrowLeft /> Back to courses
        </Button>
      </Link>
      <div className="flex items-start">
        {course.imageURL == "" ? (
          <div className="flex h-60 w-80 items-center justify-center rounded-md bg-slate-200">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-square h-60">
            <Image
              src={course.imageURL!}
              alt="course image"
              fill
              className="object-contain"
            />
          </div>
        )}
        <div className="ml-2 flex w-80 flex-col">
          <div className="text-3xl">{course.title}</div>
          <div>{course.description}</div>

          <div className="mt-2 flex justify-start">
            <Link href={`/courses/${courseId}`}>
              <Button variant={"default"} className="w-40" size={"lg"}>
                Start Course
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-2 text-xl">This course includes:</p>
      {course.chapters.map((chapter) => {
        return (
          <div
            key={chapter.id}
            className="mt-1 max-w-3xl rounded-md border bg-white p-2"
          >
            <div className="font-medium">
              {chapter.sequence}. {chapter.title}
            </div>
            <div>{chapter.description}</div>
          </div>
        );
      })}
    </div>
  );
}
