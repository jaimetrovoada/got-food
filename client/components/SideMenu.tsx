import { LoginResponse } from "@/types";
import Button from "./Button";
import Link from "next/link";
import { signOut, signIn } from "next-auth/react";
import Avatar from "./Avatar";
import { ChevronDown } from "react-feather";
import { getClasses } from "@/lib/helpers";
import { usePathname } from "next/navigation";

interface Props {
  user: LoginResponse | undefined;
  restaurants:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  isOpen: boolean;
}

const SideMenu = ({ user, restaurants, isOpen }: Props) => {
  const menuList = user ? [
    {
      name: "Explore",
      link: `/restaurants`,
    },
    {
      name: "Profile",
      link: `/profile`,
    },
  ] : [
    {
      name: "Explore",
      link: `/restaurants`,
    },
    ];

  const myRestaurantsList = restaurants
    ? restaurants.map((restaurant) => {
        return {
          name: restaurant.name,
          id: restaurant.id,
          link: `/manage/${restaurant.id}/details`,
        };
      })
    : null;

  const currentRoute = usePathname();
  const isActive = (route: string) => {
    return currentRoute === route;
  };

  const isRestaurantActive = (id: string) => {
    return (
      currentRoute === `/manage/${id}/details` ||
      currentRoute === `/manage/${id}/orders` ||
      currentRoute === `/manage/${id}/menu`
    );
  };

  if (currentRoute === "/") {
    return null
  }

  return (
    <aside
      className={getClasses(
        "flex flex-col gap-1 p-4 pl-0 [grid-area:sidebar]",
        {
          hidden: !isOpen,
        }
      )}
    >
      <div className="flex max-h-full flex-1 flex-col gap-1 overflow-auto">
        {menuList.map((item) => (
          <Item
            key={item.name}
            name={item.name}
            link={item.link}
            isActive={isActive(item.link)}
          />
        ))}
        {user && user.role === "business" && (
          <>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary
                className={getClasses(
                  "flex cursor-pointer items-center justify-between gap-1.5 rounded-lg px-4 py-2 hover:bg-neutral-950/40",
                  {
                    "bg-neutral-950 text-gray-200 hover:bg-neutral-950":
                      isActive("/manage"),
                  }
                )}
              >
                <Button
                  as={Link}
                  href={"/manage"}
                  variant="custom"
                  className="font-semibold text-slate-200"
                >
                  My Restaurants
                </Button>
                <ChevronDown className="transition duration-300 group-open:-rotate-180" />
              </summary>
              {myRestaurantsList?.map((item) => (
                <div className="flex-flex-col gap-1 p-2" key={item.name}>
                  <Item
                    key={item.name}
                    name={item.name}
                    link={item.link}
                    isActive={isRestaurantActive(item.id)}
                  />
                </div>
              ))}
            </details>
          </>
        )}
      </div>
      <div className="flex flex-row items-center gap-2 ">
        {user ? (
          <Button
            onClick={() => signOut()}
            variant="custom"
            className="inline-flex flex-row items-center gap-2 rounded-xl border border-transparent p-2 font-semibold text-slate-200 hover:border-neutral-200/75"
          >
            <Avatar name={user?.name} />
            <span>Logout</span>
          </Button>
        ) : (
          <Button onClick={() => signIn()} variant="secondary">
            Login
          </Button>
        )}
      </div>
    </aside>
  );
};

export default SideMenu;

interface ItemProps {
  name: string;
  link: string;
  isActive: boolean;
}
const Item = ({ name, link, isActive }: ItemProps) => {
  return (
    <Button
      as={Link}
      href={link}
      variant="custom"
      className={getClasses(
        "w-full rounded-lg px-4 py-2 font-semibold text-slate-200 hover:bg-neutral-950/40 ",
        {
          "bg-neutral-950 px-4 py-2 text-gray-200 hover:bg-neutral-950":
            isActive,
        }
      )}
    >
      {name}
    </Button>
  );
};
