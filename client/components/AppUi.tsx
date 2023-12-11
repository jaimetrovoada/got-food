"use client";
import { IRestaurant, LoginResponse } from "@/types";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { useState } from "react";
import { Toaster } from "./ui/toaster";

interface Props {
  user: LoginResponse | undefined;
  children?: React.ReactNode;
}
const AppUi = ({ user, children }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Header toggleMenu={toggleMenu} />
      <SideMenu user={user} restaurants={user?.restaurants} isOpen={isOpen} />
      {children}
      <Toaster />
    </>
  );
};

export default AppUi;
