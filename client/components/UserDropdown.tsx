"use client";

import { LoginResponse } from "@/types";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";
import Button from "./Button";
import Avatar from "./Avatar";

interface Props {
  user: LoginResponse;
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
    user?.role === "business"
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
    <div className="relative">
      <Button
        className="h-10 w-10 rounded-full border border-black/50 p-0"
        onClick={showMenu}
        variant="custom"
      >
        <Avatar name={user?.name} />
      </Button>
      <div
        ref={menuRef}
        className="absolute -bottom-0 right-0 z-10 hidden w-auto translate-y-full flex-col gap-1 rounded-b-md opacity-0 shadow-lg transition-all lg:right-1/2 lg:translate-x-1/2"
      >
        {menuList.map((item) => (
          <Button
            as={Link}
            href={item.link}
            variant="custom"
            className="rounded-xl border border-gray-600/50 bg-neutral-950 p-2 text-center font-semibold text-slate-200 shadow-lg hover:border-neutral-200/75"
            key={item.name}
          >
            {item.name}
          </Button>
        ))}
        <Button
          onClick={() => signOut()}
          variant="custom"
          className="rounded-xl border border-gray-600/50 bg-neutral-950 p-2 text-center font-semibold text-slate-200 shadow-lg hover:border-neutral-200/75"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserDropdown;
