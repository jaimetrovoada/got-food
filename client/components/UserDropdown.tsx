"use client";

import React, { useRef } from "react";
import Avatar from "@/assets/avatar.svg";
import Button from "./Button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserRole } from "@/types";

interface Props {}

const UserDropdown = ({}: Props) => {
  const { data: session } = useSession();
  const user = session?.user;
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
         hidden w-full translate-y-full flex-row rounded-b-md bg-white opacity-0 shadow-lg transition-all`}
      >
        {menuList.map((item) => (
          <Button
            as={Link}
            href={item.link}
            variant="custom"
            className="flex-1 rounded-xl p-2 text-center font-semibold text-gray-900 hover:bg-gray-50"
            key={item.name}
          >
            {item.name}
          </Button>
        ))}
        <Button
          onClick={() => signOut()}
          variant="custom"
          className="flex-1 rounded-xl p-2 text-center font-semibold text-gray-900 hover:bg-gray-50"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserDropdown;
