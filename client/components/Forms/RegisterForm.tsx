"use client";
import Button from "../Button";
import { useForm } from "react-hook-form";
import authService from "@/lib/authService";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useToasts } from "@/lib/hooks";

export enum Role {
  BUSINESS = "business",
  CUSTOMER = "customer",
}

interface Inputs {
  name: string;
  email: string;
  password: string;
  role: Role;
}
interface Props {}

const RegisterForm = ({}: Props) => {
  const router = useRouter();
  const { setSuccessMsg, setErrorMsg } = useToasts();

  const { register, watch, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      role: Role.CUSTOMER,
    },
  });
  const name = watch("name");
  const email = watch("email");
  const password = watch("password");
  const role = watch("role");

  console.log({ name, email, password, role });

  const onSubmit = async (data: Inputs) => {
    try {
      const res = await authService.register({
        role: data.role,
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log({ res });
      if (res.status === 201) {
        setSuccessMsg("Registration Complete");
        router.replace("/auth/login");
      }
    } catch (err) {
      console.log({ err });
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return setErrorMsg(err.response?.data?.error);
        }
      }
      setErrorMsg("Something went wrong, please try again");
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
            value={Role.BUSINESS}
          />
          <label htmlFor="role">Yes</label>
        </div>
        <div>
          <input
            type="radio"
            id="radio_no"
            {...register("role", { required: true })}
            value={Role.CUSTOMER}
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
