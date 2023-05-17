"use client";

import Head from "next/head";
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
      <header className="container mx-auto flex flex-row justify-between p-4">
        <Link href="/">got food?</Link>
        <div>
          {user.id ? (
            <Button as={Link} href={`/users/${user.id}`} variant="secondary">
              Logged in as {user.name}
            </Button>
          ) : (
            <Button as={Link} href="/auth/login" variant="secondary">
              Login
            </Button>
          )}
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <ToastsProvider>
        {children}
        <Toasts />
      </ToastsProvider>
    </>
  );
};

export default Layout;
