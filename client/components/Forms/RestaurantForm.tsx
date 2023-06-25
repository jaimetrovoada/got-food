"use client";
import restaurantsService from "@/lib/restaurants.service";
import { IRestaurant, LoginResponse } from "@/types";
import { Trash } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import { useRouter } from "next/navigation";
import Form from "../Form";
import Input from "./Input";
import ImageInput from "./ImageInput";

type Inputs = {
  name: string;
  description: string;
  address: string;
  logo: FileList;
};
interface Props {
  user: LoginResponse;
  initialValues?: IRestaurant | null;
}
const RestaurantForm = ({ user, initialValues }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    values: {
      name: initialValues?.name || undefined,
      description: initialValues?.description || null,
      address: initialValues?.address || null,
      logo: null,
    },
  });

  const logo = watch("logo");

  const handleDeleteRestaurant = async () => {
    const [_, err] = await restaurantsService.deleteRestaurant(
      user?.token,
      initialValues?.id
    );

    if (err) {
      console.log(err);
    } else {
      router.replace(`/manage`);
    }
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("submit", { data });
    const [_, err] = await restaurantsService.createRestaurant(user.token, {
      name: data.name,
      description: data.description,
      address: data.address,
      logo: data.logo[0],
    });
    if (err) {
      console.log(err);
    } else {
      router.refresh();
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onReset={() => reset()}>
      <Input name="name" label="Name" register={register} error={errors.name} />
      <Input
        name="description"
        label="Description"
        register={register}
        rules={{ required: !initialValues }}
        error={errors.description}
      />
      <Input
        name="address"
        label="Address"
        register={register}
        rules={{ required: !initialValues }}
        error={errors.address}
      />
      <ImageInput
        name="logo"
        register={register}
        rules={{ required: !initialValues }}
        error={errors.logo}
        isSelected={!!logo || !!initialValues}
      />
      <div className="flex gap-4">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
        {initialValues && (
          <Button
            type="button"
            onClick={handleDeleteRestaurant}
            variant="custom"
            className="ml-auto"
          >
            <Trash className="stroke-red-600" />
          </Button>
        )}
      </div>
    </Form>
  );
};

export default RestaurantForm;
