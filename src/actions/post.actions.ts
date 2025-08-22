"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.actions";
import { revalidatePath } from "next/cache";

export const createPost = async (content: string, image: string) => {
  try {
    const userId = await getDbUserId();
    if (!userId) return { success: false, data: null, message: "unauthorized" };
    if (!content.trim())
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
    console.log("error while creating post", error);

    return { success: false, data: null, message: "something went wrong" };
  }
};

export const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        like: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
            like: true,
          },
        },
      },
    });

    return posts;
  } catch (error) {
    console.log("error while getting posts", error);

    return [];
  }
};
