"use client";

import React, { useRef } from "react";
import Avatar from "@/assets/avatar.svg";
import Button from "./Button";
import Link from "next/link";

interface Props {
  userId: string;
  logoutFunc: () => void;
}

const UserDropdown = ({ userId, logoutFunc }: Props) => {

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

  return (
    <div className="relative">
      <Button
        className="h-12 w-12 rounded-full border-2 border-black p-0"
        onClick={showMenu}
        variant="custom"
      >
        <Avatar className="h-full w-full" />
      </Button>
      <div
        ref={menuRef}
        className={`absolute -bottom-24
         right-1/2 z-10 hidden h-24 w-20 translate-x-1/2 flex-col justify-center rounded-2xl border-2 border-black bg-white opacity-0 shadow-custom transition-all`}
      >
        <Button
          as={Link}
          href={`/users/${userId}`}
          variant="custom"
          className="rounded-xl p-2 text-center hover:bg-gray-200"
        >
          Profile
        </Button>
        <Button
          onClick={logoutFunc}
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
