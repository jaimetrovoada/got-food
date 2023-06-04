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
        <main className="flex flex-1 flex-col overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-track-rounded-md scrollbar-thumb-rounded-md">
          {children}
        </main>
        <Toasts />
      </ToastsProvider>
    </>
  );
};

export default Layout;
