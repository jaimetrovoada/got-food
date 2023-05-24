"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import Toasts from "./Toasts";
import ToastsProvider from "@/contexts/ToastsProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/reducers/store";
import { removeAuth, setAuth } from "@/reducers/authReducers";
import { useToasts } from "@/hooks";
import Button from "./Button";
import { useRouter } from "next/navigation";
import UserDropdown from "./UserDropdown";
import { Role } from "./Forms/RegisterForm";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  console.log({ user });
  const { setSuccessMsg } = useToasts();

  const router = useRouter();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(
        setAuth({
          name: user.name,
          email: user.email,
          id: user.id,
          token: user.token,
          role: user.role,
        })
      );
      setSuccessMsg(`logged in as ${user.name}`);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    dispatch(removeAuth());
    router.replace("/");
  };
  return (
    <>
      <header>
        <nav className="container mx-auto flex flex-row items-center justify-between py-2 px-4">
          <Link href="/" className="text-3xl font-bold uppercase">
            got food?
          </Link>
          {user.id ? (
            <UserDropdown
              userId={user.id}
              userRole={user.role as Role}
              logoutFunc={handleLogout}
            />
          ) : (
            <Button as={Link} href="/auth/login" variant="secondary">
              Login
            </Button>
          )}
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
