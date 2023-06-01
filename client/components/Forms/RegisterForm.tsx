"use client";
import Button from "../Button";
import { useForm } from "react-hook-form";
import authService from "@/lib/authService";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useToasts } from "@/lib/hooks";
import { UserRole } from "@/types";

interface Inputs {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
interface Props {}

const RegisterForm = ({}: Props) => {
  const router = useRouter();
  const { setSuccessMsg, setErrorMsg } = useToasts();

  const { register, watch, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      role: UserRole.CUSTOMER,
    },
  });
  const name = watch("name");
  const email = watch("email");
  const password = watch("password");
  const role = watch("role");

  console.log({ name, email, password, role });

  const onSubmit = async (data: Inputs) => {
    const [_, err] = await authService.register({
      role: data.role,
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (err) {
      console.log({ err });
      setErrorMsg("Something went wrong, please try again");
    } else {
      setSuccessMsg("Registration Complete");
      router.replace("/auth/login");
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
          id="name"
          className="rounded-xl border p-2 focus:outline-none"
          {...register("name", { required: true })}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="rounded-xl border p-2 focus:outline-none"
          {...register("email", { required: true })}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="rounded-xl border p-2 focus:outline-none"
          {...register("password", { required: true })}
        />
      </div>

      <fieldset className="flex flex-row gap-4">
        <legend>I want to add my restaurants: </legend>
        <div>
          <input
            type="radio"
            id="radio_yes"
            {...register("role", { required: true })}
            value={UserRole.BUSINESS}
          />
          <label htmlFor="role">Yes</label>
        </div>
        <div>
          <input
            type="radio"
            id="radio_no"
            {...register("role", { required: true })}
            value={UserRole.CUSTOMER}
          />
          <label htmlFor="role">No</label>
        </div>
      </fieldset>
      <div className="flex gap-4">
        <Button type="submit" disabled={!email || !password || !name || !role}>
          Submit
        </Button>
        <Button useResetStyles variant="secondary" onClick={() => reset()}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
