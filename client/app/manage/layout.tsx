"use client";
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
  return <>{children}</>;
}
