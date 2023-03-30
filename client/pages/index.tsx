import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link
        href="/restaurants"
        className="rounded-lg border p-2 text-2xl font-bold text-slate-600 shadow-md"
      >
        Explore
      </Link>
    </>
  );
}
