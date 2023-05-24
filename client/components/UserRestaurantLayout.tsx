"use client";

import React from "react";
import Button from "./Button";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Container from "./Container";

interface Props {
  children: React.ReactNode;
}
const UserRestaurantLayout = ({ children }: Props) => {
  const router = usePathname();
  const params = useParams();
  console.log({ params });
  const currentRoute = router as string;
  console.log({ currentRoute });
  const routes = [
    {
      name: "Dashboard",
      path: `/manage/${params.slug}/dashboard`,
    },
    {
      name: "Menu",
      path: `/manage/${params.slug}/menu`,
    },
    {
      name: "Details",
      path: `/manage/${params.slug}/details`,
    },
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
                  className={`font-normal ${
                    isActive(route.name) ? "underline" : "text-gray-600"
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

export default UserRestaurantLayout;
