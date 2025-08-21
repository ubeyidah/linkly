"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export const syncUser = async () => {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) return;

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existingUser) return existingUser;
    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email: user.emailAddresses[0].emailAddress,
        username:
          user.username || user.emailAddresses[0].emailAddress.split("@")[0],
        image: user.imageUrl,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
      },
    });

    return dbUser;
  } catch (error) {
    console.log("Error in user Sync ", error);
  }
};

export const getUserByClerkId = async (clerkId: string) => {
  return await prisma.user.findUnique({
    where: { clerkId },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });
};

export const getDbUserId = async () => {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");
  const user = await getUserByClerkId(clerkId);
  if (!user) throw new Error("User not found");
  return user.id;
};

export const getSuggestedUsers = async () => {
  try {
    const userId = await getDbUserId();
    if (!userId) return [];
    const suggestedUsers = await prisma.user.findMany({
      where: {
        AND: [
          { NOT: { id: userId } },
          {
            NOT: {
              followers: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        _count: {
          select: {
            followers: true,
          },
        },
      },
      take: 4,
    });

    return suggestedUsers;
  } catch (error) {
    console.log("Error fetching random users", error);
    return [];
  }
};
