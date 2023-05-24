"use client";

import UserLayout from "@/components/UserLayout";
import { RootState } from "@/reducers/store";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const user = useSelector((state: RootState) => state.user);
  const slug = useParams().user;
  console.log({ slug });
  if (!user || user.id !== slug) {
    throw new Error("NotLoggedIn");
  }

  return <UserLayout>{children}</UserLayout>;
}
