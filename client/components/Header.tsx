import Link from "next/link";
import UserDropdown from "./UserDropdown";
import { IUser } from "@/types";

interface Props {
  user: IUser;
}

const Header = ({ user }: Props) => {
  return (
    <header className="relative border-gray-700 bg-black">
      <nav className="container mx-auto flex flex-row items-center justify-between py-2 px-4 xl:px-0">
        <Link href="/" className="text-3xl font-bold uppercase">
          got food?
        </Link>
        <UserDropdown user={user} />
      </nav>
    </header>
  );
};

export default Header;
