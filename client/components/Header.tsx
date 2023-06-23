import Link from "next/link";
import UserDropdown from "./UserDropdown";
import { LoginResponse } from "@/types";

interface Props {
  user: LoginResponse;
}

const Header = ({ user }: Props) => {
  return (
    <header className="relative border-gray-700 bg-black">
      <nav className="container mx-auto flex flex-row items-center justify-between px-4 py-2 xl:px-0">
        <Link href="/" className="text-3xl font-bold uppercase">
          got food?
        </Link>
        <UserDropdown user={user} />
      </nav>
    </header>
  );
};

export default Header;
