"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Container from "./Container";
import SubNav from "./SubNav";

interface Props {
  children: React.ReactNode;
}
const UserLayout = ({ children }: Props) => {
  const router = usePathname();

  const currentRoute = router as string;
  const routes = [
    {
      name: "Profile",
      path: `/profile`,
    },
    { name: "Orders", path: `/profile/orders` },
  ];

  const activeRoute = routes.find((route) => {
    const pattern = new RegExp(`^${route.path}$`);
    return pattern.test(currentRoute);
  });
  const isActive = (route: string) => {
    return activeRoute?.name === route;
  };

  return (
    <Container className="flex flex-col gap-4 md:flex-row">
      <SubNav routes={routes} isActive={isActive} />
      {children}
    </Container>
  );
};

export default UserLayout;
