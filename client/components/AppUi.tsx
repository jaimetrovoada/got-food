"use client";
import { IRestaurant, LoginResponse } from "@/types";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { useState } from "react";

interface Props {
  user?: LoginResponse;
  restaurants?: IRestaurant[];
  children?: React.ReactNode;
}
const AppUi = ({ user, restaurants, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <>
      <Header toggleMenu={toggleMenu} />
      <main className="container mx-auto flex flex-1 flex-row overflow-hidden">
        <SideMenu user={user} restaurants={restaurants} isOpen={isOpen} />
        {children}
      </main>
    </>
  );
};

export default AppUi;
