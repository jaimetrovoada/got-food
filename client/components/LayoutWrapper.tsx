"use client";

import { store } from "@/reducers/store";
import React from "react";
import { Provider } from "react-redux";
import Layout from "./Layout";

interface Props {
  children: React.ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <Layout>{children}</Layout>
    </Provider>
  );
};

export default LayoutWrapper;
