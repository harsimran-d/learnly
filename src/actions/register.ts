"use server";
import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { setTimeout } from "timers/promises";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  await setTimeout(3000);
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  return { success: "Email sent!" };
};
