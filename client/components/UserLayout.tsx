"use client";

import { RootState } from "@/lib/reducers/store";
import React from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";

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
    <>
      <Container>
        <nav>
          <ul className="flex gap-2">
            {routes.map((route) => (
              <li key={route.name}>
                <Button
                  as={Link}
                  href={route.path}
                  variant="custom"
                  className={`${
                    isActive(route.name)
                      ? "underline"
                      : "font-normal text-gray-700"
                  }`}
                >
                  {route.name}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        {children}
      </Container>
    </>
  );
};

export default UserLayout;
