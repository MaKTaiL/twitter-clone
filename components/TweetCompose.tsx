import { ProfilePicture } from "./ProfilePicture";
import { getNextServerSession } from "@/lib/nextAuth";
import { TextArea } from "./TextArea";

export default async function TweetCompose() {
  const session = await getNextServerSession();

  return session ? (
    <div className="flex items-start gap-4 border-b p-4">
      <ProfilePicture src={session.user?.image} />
      <TextArea />
    </div>
  ) : null;
}
