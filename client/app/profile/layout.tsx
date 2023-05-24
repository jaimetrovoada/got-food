"use client";

import UserLayout from "@/components/UserLayout";
import { RootState } from "@/reducers/store";
import { useSelector } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const user = useSelector((state: RootState) => state.user);
  if (!user || !user.id) {
    throw new Error("NotLoggedIn");
  }

  return <UserLayout>{children}</UserLayout>;
}
