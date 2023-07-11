"use client";
import { IRestaurant, LoginResponse } from "@/types";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { useState } from "react";

interface Props {
  user: LoginResponse | undefined;
  restaurants: IRestaurant[] | undefined;
  children?: React.ReactNode;
}
const AppUi = ({ user, restaurants, children }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Header toggleMenu={toggleMenu} />
      <SideMenu user={user} restaurants={restaurants} isOpen={isOpen} />
      {children}
    </>
  );
};

export default AppUi;
