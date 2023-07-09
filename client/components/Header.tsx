import Link from "next/link";
import { Menu } from "react-feather";
import Button from "./Button";

interface Props {
  toggleMenu: () => void;
}

const Header = ({ toggleMenu }: Props) => {
  return (
    <header className="">
      <nav className="container mx-auto flex flex-row items-center gap-2 px-4 py-2 xl:px-0">
        <Button variant="custom" onClick={toggleMenu} className="lg:hidden">
          <Menu />
        </Button>
        <Link href="/" className="text-3xl font-bold uppercase">
          got food?
        </Link>
      </nav>
    </header>
  );
};

export default Header;
