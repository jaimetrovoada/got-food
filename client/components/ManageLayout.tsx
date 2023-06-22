"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Container from "./Container";
import SubNav from "./SubNav";

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
      name: "Details",
      path: `/manage/${params.slug}/details`,
    },
    {
      name: "Menu",
      path: `/manage/${params.slug}/menu`,
    },
    {
      name: "Orders",
      path: `/manage/${params.slug}/orders`,
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
    <Container className="flex flex-col gap-4 md:flex-row">
      <SubNav title={name} routes={routes} isActive={isActive} />
      {children}
    </Container>
  );
};

export default ManageLayout;
