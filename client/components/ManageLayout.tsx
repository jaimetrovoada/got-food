"use client";

import React from "react";
import Button from "./Button";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Container from "./Container";
import { useRestaurant } from "@/hooks";

interface Props {
  children: React.ReactNode;
}
const ManageLayout = ({ children }: Props) => {
  const router = usePathname();
  const params = useParams();
  const { restaurant } = useRestaurant(params.slug);
  const currentRoute = router as string;
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
    <Container className="overflow-hidden">
      <nav>
        <ul className="flex gap-2">
          <span className="font-bold">{restaurant?.name}/</span>
          {routes.map((route) => (
            <li key={route.name}>
              <Button
                as={Link}
                replace
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
  );
};

export default ManageLayout;
