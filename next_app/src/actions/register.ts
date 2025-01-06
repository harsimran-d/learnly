"use server";
import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt";

import { createNewUser, getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }
    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already in use" };
    }
    await createNewUser(name, email, hashedPassword);
    // TODO: Send verification email token
    return { success: "Account Created Successfully" };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong" };
  }
};
