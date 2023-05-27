"use client";

import React, { useRef } from "react";
import Avatar from "@/assets/avatar.svg";
import Button from "./Button";
import Link from "next/link";
import { Role } from "./Forms/RegisterForm";
import { signIn, signOut, useSession } from "next-auth/react";

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
    user?.role === Role.BUSINESS
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
    <div className="relative h-10 w-10">
      <Button
        className="h-10 w-10 rounded-full border-2 border-black p-0"
        onClick={showMenu}
        variant="custom"
      >
        <Avatar className="h-full w-full" />
      </Button>
      <div
        ref={menuRef}
        className={`absolute right-0 -bottom-1 z-10
         hidden h-40 w-40 translate-y-full flex-col justify-center rounded-2xl border-2 border-black bg-white opacity-0 shadow-custom transition-all xl:right-1/2 xl:translate-x-1/2`}
      >
        {menuList.map((item) => (
          <Button
            as={Link}
            href={item.link}
            variant="custom"
            className="rounded-xl p-2 text-center hover:bg-gray-200"
            key={item.name}
          >
            {item.name}
          </Button>
        ))}
        <Button
          onClick={() => signOut()}
          variant="custom"
          className="rounded-xl p-2 text-center hover:bg-gray-200"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserDropdown;
