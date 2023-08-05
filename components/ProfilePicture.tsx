import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";

export function ProfilePicture({
  src,
  size = 60,
}: {
  src?: string | null;
  size?: number;
}) {
  return src ? (
    <div className="overflow-hidden rounded-full">
      <Image
        src={src}
        alt="Profile Image"
        width={size}
        height={size}
        priority
      />
    </div>
  ) : (
    <div className={`overflow-hidden rounded-full bg-gray-300 text-6xl`}>
      <AiOutlineUser />
    </div>
  );
}
