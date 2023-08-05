"use client";

import { ProfilePicture } from "./ProfilePicture";
import { intlFormatDistance } from "date-fns";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import type { ListTweetsResponse } from "@/app/api/tweets/types";
import InfiniteScroll from "react-infinite-scroll-component";
import { likeTweet, listTweets, unlikeTweet } from "@/app/api/tweets/actions";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

function TweetCard({ tweet }: { tweet: ListTweetsResponse["tweets"][0] }) {
  const queryClient = useQueryClient();

  async function handleLike() {
    if (tweet.likedByMe) {
      await unlikeTweet({ tweetId: tweet.id });
    } else {
      await likeTweet({ tweetId: tweet.id });
    }

    queryClient.setQueryData<InfiniteData<ListTweetsResponse>>(
      ["tweets"],
      (oldData) => {
        if (!oldData) return;
        const newData = {
          ...oldData,
          pages: oldData.pages.map((page) => {
            return {
              ...page,
              tweets: page.tweets.map((data) => {
                if (data.id === tweet.id) {
                  return {
                    ...data,
                    likedByMe: !data.likedByMe,
                    _count: {
                      ...data._count,
                      likes: data.likedByMe
                        ? data._count.likes - 1
                        : data._count.likes + 1,
                    },
                  };
                }
                return data;
              }),
            };
          }),
        };
        return newData;
      },
    );
  }

  return (
    <li key={tweet.id}>
      <div className="flex gap-4 border-b p-4">
        <div>
          <ProfilePicture src={tweet.author.image} />
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400">{`@${
            tweet.author.name
          } - ${intlFormatDistance(tweet.createdAt, new Date())}`}</span>
          <span className="whitespace-break-spaces text-lg">{tweet.text}</span>
          <div className="flex items-center pt-1 text-lg">
            <button
              onClick={handleLike}
              className="transition-colors duration-200"
            >
              {tweet.likedByMe ? (
                <div className="text-red-500">
                  <AiFillHeart />
                </div>
              ) : (
                <AiOutlineHeart />
              )}
            </button>
            <span className="ml-1 text-gray-400">{tweet._count.likes}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export function TweetList() {
  function queryFn({
    pageParam,
  }: {
    pageParam?: { id: string; createdAt: Date };
  }) {
    return listTweets(JSON.stringify(pageParam));
  }

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["tweets"],
    queryFn: queryFn,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
  });

  function getDataLength(query: typeof data) {
    if (!query) return 0;

    return query.pages.reduce((acc, page) => acc + page.tweets.length, 0);
  }

  if (data) {
    return (
      <ul>
        <InfiniteScroll
          dataLength={getDataLength(data)}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            <div className="p-6 text-center font-bold text-gray-400">
              Loading...
            </div>
          }
          endMessage={
            <div className="p-6 text-center font-bold text-gray-400">
              No more tweets. Follow more people.
            </div>
          }
        >
          {data.pages.map((page) =>
            page.tweets.map((tweet) => (
              <TweetCard tweet={tweet} key={tweet.id} />
            )),
          )}
        </InfiniteScroll>
      </ul>
    );
  }

  return <div></div>;
}
