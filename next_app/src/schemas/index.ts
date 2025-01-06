import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().nonempty({
    message: "Password cannot be empty",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const CreateCourseSchema = z.object({
  title: z.string().refine((val) => val.trim().length > 0, {
    message: "Title cannot be empty",
  }),
});

export const CreateChapterSchema = z.object({
  title: z.string().refine((val) => val.trim().length > 0, {
    message: "Title cannot be empty",
  }),
});
