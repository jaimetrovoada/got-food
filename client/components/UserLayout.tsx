"use client";

import React from "react";
import Button from "./Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Breadcrumb from "./Breadcrumb";
import { getClasses } from "@/lib/helpers";

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
      <Container className="flex flex-col gap-4 md:flex-row">
        <ul className="flex w-1/4 flex-row space-y-1 md:flex-col md:pl-2">
          {routes.map((route) => (
            <li
              key={route.name}
              className={getClasses(
                "rounded-lg px-4 py-2 text-gray-400 hover:bg-neutral-950/40 hover:text-gray-200",
                {
                  "bg-neutral-950 px-4 py-2 text-gray-200 hover:bg-neutral-950":
                    isActive(route.name),
                }
              )}
            >
              <Button as={Link} href={route.path} variant="custom">
                {route.name}
              </Button>
            </li>
          ))}
        </ul>
        {children}
      </Container>
    </>
  );
};

export default UserLayout;
