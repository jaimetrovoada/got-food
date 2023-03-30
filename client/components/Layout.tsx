import Head from "next/head";
import Link from "next/link";
import React from "react";
import Toasts from "./Toasts";
import ToastsProvider from "@/contexts/ToastsProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex flex-row justify-between border-b p-4">
        <Link href="/">got food?</Link>
        <Link
          href="/auth"
          className="rounded-lg border text-slate-600 p-1 shadow-md"
        >
          Login{" "}
        </Link>
      </header>
      <ToastsProvider>
        <main className="container mx-auto flex flex-1 flex-col items-center justify-center">
          {children}
        </main>
        <Toasts />
      </ToastsProvider>
    </>
  );
};

export default Layout;

// TODO: add login/logout button
