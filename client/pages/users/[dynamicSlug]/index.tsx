import React from "react";
import { RootState } from "@/reducers/store";
import { NextPageWithLayout } from "@/pages/_app";
import { useSelector } from "react-redux";
import { getUserLayout } from "@/components/UserLayout";
import userService from "@/services/userService";

const UserPage: NextPageWithLayout = () => {
  const user = useSelector((state: RootState) => state.user);
  const { user: userinfo } = userService.useUserDetails(user.id);

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

UserPage.getLayout = getUserLayout;

export default UserPage;
