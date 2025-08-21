"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.actions";
import { revalidatePath } from "next/cache";

export const createPost = async (content: string, image: string) => {
  try {
    const userId = await getDbUserId();
    if (!userId) return { success: false, data: null, message: "unauthorized" };
    if (!content.trim() || !image)
      return { success: false, data: null, message: "invalid post content" };

    await prisma.post.create({
      data: {
        content,
        image,
        authorId: userId,
      },
    });
    revalidatePath("/");
    return { success: true, data: null, message: "post created successfully" };
  } catch (error) {
    return { success: false, data: null, message: "something went wrong" };
  }
};
