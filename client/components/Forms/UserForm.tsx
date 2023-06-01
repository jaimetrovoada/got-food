"use client";
import authService from "@/lib/authService";
import { useToasts } from "@/lib/hooks";
import { IUser } from "@/types";
import { Trash } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";

interface Inputs {
  name?: string;
  email?: string;
  password?: string;
}
interface Props {
  user: IUser;
}
const UserForm = ({ user }: Props) => {
  const { setSuccessMsg, setErrorMsg } = useToasts();

  const { register, handleSubmit } = useForm<Inputs>({
    values: {
      name: user.name || "",
      email: user.email || "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const [_, err] = await authService.updateUser(user.token, user.id, {
      name: data.name,
      email: data.email,
      password: data.password,
      role: user.role,
    });
    if (err) {
      console.log(err);
      setErrorMsg(err.message);
    } else {
      setSuccessMsg("User Updated");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-2xl border-2 border-black/50 bg-white p-4 shadow-custom"
    >
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          className="rounded-xl border p-2 focus:outline-none"
          id="name"
          {...register("name")}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="rounded-xl border p-2 focus:outline-none"
          id="email"
          {...register("email")}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          className="rounded-xl border p-2 focus:outline-none"
          id="password"
          type="password"
          {...register("password")}
        />
      </div>
      <div className="flex gap-4">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
        <Button onClick={null} variant="custom" className="ml-auto">
          <Trash className="stroke-red-600" />
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
