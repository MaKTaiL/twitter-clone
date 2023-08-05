"use client";

import { use, useState } from "react";
import { TweetButton } from "./Buttons";
import { createTweet } from "@/app/api/tweets/actions";
import { useSession } from "next-auth/react";
import { ListTweetsResponse } from "@/app/api/tweets/types";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";

export function TextArea() {
  const [text, setText] = useState("");
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);

    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  }

  const createTweetAction = async (text: string) => {
    if (!text) return;
    if (!session?.user?.id) return;

    const tweet = await createTweet({ text });
    if (!tweet) return;

    queryClient.setQueryData<InfiniteData<ListTweetsResponse>>(
      ["tweets"],
      (oldData) => {
        if (!oldData) return;
        const newData = {
          ...oldData,
          pages: oldData.pages.map((page) => {
            return {
              ...page,
              tweets: [tweet, ...page.tweets],
            };
          }),
        };
        return newData;
      },
    );

    setText("");
    const textarea = document.querySelector("textarea");
    if (textarea) textarea.style.height = "auto";
  };

  return (
    <div className="flex grow flex-col">
      <textarea
        className="w-full resize-none bg-transparent p-2 text-lg outline-none"
        placeholder="What's happening?"
        value={text}
        onChange={handleTextChange}
      ></textarea>
      <div className="self-end">
        <TweetButton onClick={() => createTweetAction(text)} />
      </div>
    </div>
  );
}
