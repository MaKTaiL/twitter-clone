import { listTweets } from "./actions";

export type ListTweetsResponse = Awaited<ReturnType<typeof listTweets>>;
