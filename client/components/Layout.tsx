"use client";

import ToastsProvider from "@/lib/contexts/ToastsProvider";
import React from "react";
import Toasts from "./Toasts";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
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
