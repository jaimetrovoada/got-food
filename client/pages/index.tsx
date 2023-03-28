import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Link
        href="/auth"
        className="rounded-lg border-2 border-black text-slate-600"
      >
        Login{" "}
      </Link>
    </>
  );
}
