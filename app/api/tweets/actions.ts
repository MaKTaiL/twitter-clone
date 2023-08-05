"use server";

import { getNextServerSession } from "@/lib/nextAuth";
import { prisma } from "@/lib/prismaClient";

export async function listTweets(cursor?: string) {
  const session = await getNextServerSession();

  let pageParam: { id: string; createdAt: Date } | undefined;

  if (cursor) {
    pageParam = JSON.parse(cursor);
  } else {
    pageParam = undefined;
  }

  const tweets = await prisma.tweet.findMany({
    orderBy: { createdAt: "desc" },
    take: 11,
    include: {
      _count: {
        select: { likes: true },
      },
      author: true,
      likes: {
        select: {
          authorId: true,
        },
      },
    },
    cursor: pageParam
      ? { id: pageParam.id, createdAt: pageParam.createdAt }
      : undefined,
  });

  return {
    tweets: tweets.slice(0, 10).map((tweet) => ({
      ...tweet,
      likedByMe: tweet.likes.some((like) => like.authorId === session?.user.id),
    })),
    nextCursor:
      tweets.length > 10
        ? {
            id: tweets[tweets.length - 1].id,
            createdAt: tweets[tweets.length - 1].createdAt,
          }
        : undefined,
  };
}

export async function createTweet({ text }: { text: string }) {
  const session = await getNextServerSession();
  if (!session) return;
  const tweet = await prisma.tweet.create({
    data: {
      authorId: session.user.id,
      text,
    },
    include: {
      _count: {
        select: { likes: true },
      },
      author: true,
      likes: {
        select: {
          authorId: true,
        },
      },
    },
  });

  return { ...tweet, likedByMe: false };
}

export async function likeTweet({ tweetId }: { tweetId: string }) {
  const session = await getNextServerSession();
  if (!session) return;
  await prisma.like.create({
    data: {
      authorId: session.user.id,
      tweetId,
    },
  });
}

export async function unlikeTweet({ tweetId }: { tweetId: string }) {
  const session = await getNextServerSession();
  if (!session) return;
  await prisma.like.delete({
    where: {
      tweetId_authorId: {
        authorId: session.user.id,
        tweetId,
      },
    },
  });
}
