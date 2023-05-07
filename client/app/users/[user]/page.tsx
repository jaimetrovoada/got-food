"use client";

import React from "react";
import { RootState } from "@/reducers/store";
import { useSelector } from "react-redux";
import { useUserDetails } from "@/hooks";

const UserPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const { user: userinfo } = useUserDetails(user.id);

  return (
    <>
      <p className="text-3xl font-bold">Hi {user?.name}</p>
      <p>{userinfo?.name}</p>
      <p>{userinfo?.email}</p>
      <p>{userinfo?.role}</p>
      <p>Restaurants:</p>
      <ul>
        {userinfo?.restaurants.map((restaurant) => (
          <li key={restaurant.id}>{restaurant.name}</li>
        ))}
      </ul>
    </>
  );
};

export default UserPage;
