import React from "react";
import { getUser } from "@/lib/auth.service";
import UserForm from "@/components/Forms/UserForm";

const UserPage = async () => {
  const user = await getUser();

  return (
    <section className="mx-auto w-full max-w-screen-sm">
      <p className="mb-4 text-3xl font-bold">Hi {user.name}</p>
      <UserForm user={user} />
    </section>
  );
};

export default UserPage;
