"use client";

import { RootState } from "@/reducers/store";
import React from "react";
import { useSelector } from "react-redux";
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
  const user = useSelector((state: RootState) => state.user);
  const routes = [
    {
      name: "Dashboard",
      path: `/users/${user.id}/restaurants/${params.slug}/dashboard`,
    },
    {
      name: "Menu",
      path: `/users/${user.id}/restaurants/${params.slug}/menu`,
    },
    {
      name: "Details",
      path: `/users/${user.id}/restaurants/${params.slug}/details`,
    },
  ];

  const activeRoute = routes.find((route) => {
    const pattern = new RegExp(`^${route.path}$`);
    if (route.name === "Restaurants") {
      return new RegExp(`^/users/${user.id}/restaurants(/.*)?$`).test(
        currentRoute
      );
    }
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
