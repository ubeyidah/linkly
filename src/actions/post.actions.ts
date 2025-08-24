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

export const toggleLike = async (
  postToLikeId: string,
  postAuthorId: string
) => {
  try {
    const userId = await getDbUserId();
    if (!userId) return { success: false, data: null, message: "unauthorized" };
    const isAlreadyLiked = await prisma.like.findUnique({
      where: {
        userId_postId: {
          postId: postToLikeId,
          userId,
        },
      },
    });

    if (isAlreadyLiked) {
      await prisma.like.delete({
        where: {
          userId_postId: {
            postId: postToLikeId,
            userId: userId,
          },
        },
      });
    } else {
      await prisma.$transaction([
        prisma.like.create({
          data: {
            postId: postToLikeId,
            userId,
          },
        }),
        prisma.notification.create({
          data: {
            type: "LIKE",
            userId: postAuthorId,
            creatorId: userId,
            postId: postToLikeId,
          },
        }),
      ]);
    }

    return { success: true, data: null, message: "opration successfull" };
  } catch (error) {
    console.log("error while likeing post form server", error);
    return { success: false, data: null, message: "someting went wrong" };
  }
};

export const getComments = async (postId: string) => {
  try {
    const comment = await prisma.comment.findMany({
      where: { postId },
      include: {
        author: {
          select: {
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });
    return comment;
  } catch (error) {
    console.log("error while getting comments", error);
  }
};

export const sendComment = async (
  content: string,
  postId: string,
  authorId: string
) => {
  if (!content.trim()) return;
  try {
    const userId = await getDbUserId();
    if (!userId) return { success: false, data: null, message: "unauthorized" };
    await prisma.$transaction(async (tx) => {
      const comment = await tx.comment.create({
        data: {
          content,
          authorId: userId,
          postId,
        },
      });
      if (authorId !== userId) {
        await tx.notification.create({
          data: {
            type: "COMMENT",
            userId: authorId,
            creatorId: userId,
            commentId: comment.id,
            postId,
          },
        });
      }
    });
    revalidatePath("/");
    return {
      success: true,
      data: null,
      message: "comment created successfully",
    };
  } catch (error) {
    console.log("error while commeting the post", error);
    return { success: false, data: null, message: "someting went wrong" };
  }
};
