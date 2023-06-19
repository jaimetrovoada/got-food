"use client";

import Avatar from "@/assets/avatar.svg";
import { IUser, UserRole } from "@/types";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";
import Button from "./Button";

interface Props {
  user: IUser;
}

const UserDropdown = ({ user }: Props) => {
  const showMenu = () => {
    const el = menuRef.current;
    el.classList.toggle("hidden");
    el.classList.toggle("flex");
    setTimeout(() => {
      el.classList.toggle("opacity-0");
      el.classList.toggle("opacity-100");
    }, 100);
  };

  const menuRef = useRef<HTMLDivElement>(null);

  const menuList =
    user?.role === UserRole.BUSINESS
      ? [
          {
            name: "Profile",
            link: `/profile`,
          },
          {
            name: "My Restaurants",
            link: `/manage`,
          },
        ]
      : [
          {
            name: "Profile",
            link: `/users/${user?.id}`,
          },
        ];

  if (!user) {
    return (
      <Button onClick={() => signIn()} variant="secondary">
        Login
      </Button>
    );
  }
  return (
    <div className="h-10 w-10">
      <Button
        className="h-10 w-10 rounded-full border border-black/50 p-0"
        onClick={showMenu}
        variant="custom"
      >
        <Avatar className="h-full w-full" />
      </Button>
      <div
        ref={menuRef}
        className={`absolute right-0 -bottom-0 z-10
         hidden w-full translate-y-full flex-row rounded-b-md bg-black opacity-0 shadow-lg transition-all`}
      >
        {menuList.map((item) => (
          <Button
            as={Link}
            href={item.link}
            variant="custom"
            className="flex-1 rounded-xl p-2 text-center font-semibold text-slate-200 hover:bg-zinc-900/50"
            key={item.name}
          >
            {item.name}
          </Button>
        ))}
        <Button
          onClick={() => signOut()}
          variant="custom"
          className="flex-1 rounded-xl p-2 text-center font-semibold text-slate-200 hover:bg-zinc-900/50"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserDropdown;
