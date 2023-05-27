"use client";

import React from "react";
import Button from "./Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  params: {
    slug: string;
  };
  name: string;
}
const ManageLayout = ({ children, params, name }: Props) => {
  const router = usePathname();
  const currentRoute = router;
  const routes = [
    {
      name: "Orders",
      path: `/manage/${params.slug}/orders`,
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
      <nav>
        <ul className="flex gap-2">
          <span className="font-bold">{name}/</span>
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
    </>
  );
};

export default ManageLayout;
