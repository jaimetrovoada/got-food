import Button from "./Button";
import Link from "next/link";
import { getClasses } from "@/lib/helpers";

interface Props {
  title?: string;
  routes: {
    name: string;
    path: string;
  }[];
  isActive: (route: string) => boolean;
}

const SubNav = ({ title, routes, isActive }: Props) => {
  return (
    <nav className="flex flex-col space-y-1 md:w-1/4 md:pl-2">
      {title && (
        <h2 className="mb-2 border-b border-b-gray-200/30 py-1 text-xl font-semibold">
          {title}
        </h2>
      )}
      <ul className="flex flex-row overflow-auto md:flex-col">
        {routes.map((route) => (
          <li key={route.name}>
            <Button
              as={Link}
              href={route.path}
              variant="custom"
              className={getClasses(
                "block w-full rounded-lg px-4 py-2 text-gray-400 hover:bg-neutral-950/40 hover:text-gray-200",
                {
                  "bg-neutral-950 px-4 py-2 text-gray-200 hover:bg-neutral-950":
                    isActive(route.name),
                }
              )}
            >
              {route.name}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubNav;
