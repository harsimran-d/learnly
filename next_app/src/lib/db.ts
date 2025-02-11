import { prisma, Prisma, PublishStatus } from "db";

export type Course = Prisma.CourseGetPayload<object>;
export type Chapter = Prisma.ChapterGetPayload<object>;
export type UserChapterProgress = Prisma.UserChapterProgressGetPayload<object>;
export type Video = Prisma.VideoGetPayload<object>;
export { PublishStatus };
export default prisma;
