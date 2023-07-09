import { IRestaurant, LoginResponse } from "@/types";
import Button from "./Button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Avatar from "./Avatar";
import { ChevronDown } from "react-feather";
import { getClasses } from "@/lib/helpers";

interface Props {
  user?: LoginResponse;
  restaurants?: IRestaurant[];
  isOpen: boolean;
}

const SideMenu = ({ user, restaurants, isOpen }: Props) => {
  const menuList =
    user?.role === "business"
      ? [
          {
            name: "Explore",
            link: `/restaurants`,
          },
          {
            name: "Profile",
            link: `/profile`,
          },
          {
            name: "My Restaurants",
            link: `/manage`,
            submenu: restaurants?.map((restaurant) => {
              return {
                name: restaurant.name,
                link: `/manage/${restaurant.id}`,
              };
            }),
          },
        ]
      : [
          {
            name: "Explore",
            link: `/restaurants`,
          },
          {
            name: "Profile",
            link: `/users/${user?.id}`,
          },
        ];
  return (
    <div
      className={getClasses("flex w-auto flex-col gap-1 p-4 lg:w-auto", {
        "hidden w-0": !isOpen,
      })}
    >
      <div className="flex max-h-full flex-1 flex-col gap-1 overflow-auto">
        {menuList.map((item) => (
          <Item key={item.name} {...item} />
        ))}
      </div>
      <div className="flex flex-row items-center gap-2 ">
        <Button
          onClick={() => signOut()}
          variant="custom"
          className="inline-flex flex-row items-center gap-2 rounded-xl border border-transparent p-2 font-semibold text-slate-200 hover:border-neutral-200/75"
        >
          <Avatar name={user?.name} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default SideMenu;

interface ItemProps {
  name: string;
  link: string;
  submenu?: ItemProps[];
}
const Item = ({ name, link, submenu }: ItemProps) => {
  if (submenu?.length) {
    return (
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-xl border border-transparent p-2 hover:border-neutral-200/75">
          <Button
            as={Link}
            href={link}
            variant="custom"
            className="font-semibold text-slate-200 "
          >
            {name}
          </Button>
          <ChevronDown className="transition duration-300 group-open:-rotate-180" />
        </summary>
        {submenu.map((subitem) => (
          <div className="flex-flex-col gap-1 p-2" key={subitem.name}>
            <Button
              as={Link}
              href={subitem.link}
              variant="custom"
              className="w-full rounded-xl border border-transparent p-2 text-slate-200 hover:border-neutral-200/75"
            >
              {subitem.name}
            </Button>
          </div>
        ))}
      </details>
    );
  }
  return (
    <Button
      as={Link}
      href={link}
      variant="custom"
      className="w-full rounded-xl border border-transparent p-2 font-semibold text-slate-200 hover:border-neutral-200/75"
    >
      {name}
    </Button>
  );
};
