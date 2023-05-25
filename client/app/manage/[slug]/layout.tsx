"use client";
import ManageLayout from "@/components/ManageLayout";
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
  return <ManageLayout>{children}</ManageLayout>;
}
