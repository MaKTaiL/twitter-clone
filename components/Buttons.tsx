"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";

type NavButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  color?: "gray" | "red" | "blue";
} & React.HTMLAttributes<HTMLButtonElement>;

function NavButton({
  children,
  className,
  color = "blue",
  onClick,
}: NavButtonProps) {
  const colorClasses = {
    gray: "hover:bg-gray-200",
    red: "hover:bg-red-200",
    blue: "hover:bg-blue-200",
  };

  return (
    <button
      className={`${className} ${colorClasses[color]} flex items-center gap-2 rounded-full p-3 transition-colors duration-200`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function LoginButton() {
  return (
    <NavButton onClick={() => signIn("discord")} color="gray">
      <div className="text-3xl text-blue-700">
        <FiLogIn />
      </div>
      <span className="hidden text-lg font-bold sm:inline">Login</span>
    </NavButton>
  );
}

export function LogoutButton() {
  return (
    <NavButton onClick={signOut} color="gray">
      <div className="rotate-180 text-3xl text-red-700">
        <FiLogIn />
      </div>
      <span className="hidden text-lg font-bold md:inline">Logout</span>
    </NavButton>
  );
}

export function HomeButton() {
  return (
    <Link href="/" as="/">
      <NavButton color="gray">
        <div className="text-3xl">
          <AiOutlineHome />
        </div>
        <span className="hidden text-lg font-bold md:inline">Home</span>
      </NavButton>
    </Link>
  );
}

export function TweetButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      className="rounded-full bg-blue-400 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-blue-500"
      onClick={onClick}
    >
      Tweet
    </button>
  );
}
