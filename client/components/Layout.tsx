"use client";

import Link from "next/link";
import React from "react";
import Toasts from "./Toasts";
import ToastsProvider from "@/lib/contexts/ToastsProvider";
import UserDropdown from "./UserDropdown";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <header className="relative bg-white">
        <nav className="container mx-auto flex flex-row items-center justify-between py-2 px-4 xl:px-0">
          <Link href="/" className="text-3xl font-bold uppercase">
            got food?
          </Link>
          <UserDropdown />
        </nav>
      </header>
      <ToastsProvider>
        {children}
        <Toasts />
      </ToastsProvider>
    </>
  );
};

export default Layout;
