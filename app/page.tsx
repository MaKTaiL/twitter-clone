import { HomeHeader } from "@/components/Headers";
import TweetCompose from "@/components/TweetCompose";
import { TweetList } from "@/components/TweetList";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <HomeHeader />
      <TweetCompose />
      <TweetList />
    </div>
  );
}
