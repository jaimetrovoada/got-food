import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import Toasts from "./Toasts";
import ToastsProvider from "@/contexts/ToastsProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/reducers/store";
import { removeAuth, setAuth } from "@/reducers/authReducers";
import { useToasts } from "@/hooks";
import { useRouter } from "next/router";
import Button from "./Button";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex flex-row justify-between border-b p-4">
        <Link href="/">got food?</Link>
        <div>
          {user.id ? (
            <Button as={Link} href={`/users/${user.id}`} kind="secondary">
              Logged in as {user.name}
            </Button>
          ) : (
            <Button as={Link} href="/auth" kind="secondary">
              Login
            </Button>
          )}
          <Button kind="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
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
