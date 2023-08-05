import { HomeButton, LoginButton, LogoutButton } from "./Buttons";
import { getNextServerSession } from "@/lib/nextAuth";

export default async function NavBar() {
  const session = await getNextServerSession();

  return (
    <nav className="sticky top-0">
      <ul className="flex flex-col items-end p-2">
        <li>
          <HomeButton />
        </li>
        <li>{session?.user ? <LogoutButton /> : <LoginButton />}</li>
      </ul>
    </nav>
  );
}
