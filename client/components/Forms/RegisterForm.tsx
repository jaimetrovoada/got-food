"use client";
import Button from "../Button";
import { useForm } from "react-hook-form";
import authService from "@/lib/auth.service";
import Form from "../Form";
import Input from "./Input";
import { useRouter } from "next/navigation";

type Inputs = {
  name: string;
  email: string;
  password: string;
  role: "business" | "customer";
};
interface Props {}

const RegisterForm = ({}: Props) => {
  const router = useRouter();

  const { register, watch, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      role: "customer",
    },
  });
  const name = watch("name");
  const email = watch("email");
  const password = watch("password");
  const role = watch("role");

  const onSubmit = async (data: Inputs) => {
    const [_, err] = await authService.register({
      role: data.role,
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (err) {
      console.log({ err });
    } else {
      router.replace("/auth/login");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        name="name"
        register={register}
        rules={{ required: true }}
      />
      <Input
        label="Email"
        type="email"
        name="email"
        register={register}
        rules={{ required: true }}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        register={register}
        rules={{ required: true }}
      />

      <fieldset className="flex flex-row gap-4">
        <legend>I want to add my restaurants: </legend>
        <div>
          <input
            type="radio"
            id="radio_yes"
            {...register("role", { required: true })}
            value={"business"}
          />
          <label htmlFor="role">Yes</label>
        </div>
        <div>
          <input
            type="radio"
            id="radio_no"
            {...register("role", { required: true })}
            value={"customer"}
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
    </Form>
  );
};

export default RegisterForm;
