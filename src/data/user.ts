import db from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (e) {
    console.log(e);
    console.log("user not found", email);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createNewUser = async (
  name: string,
  email: string,
  hashedPassword: string,
) => {
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};
