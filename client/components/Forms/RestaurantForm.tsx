"use client";
import restaurantsService from "@/lib/restaurants.service";
import { IRestaurant, IUser } from "@/types";
import { Trash, UploadCloud } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import { useRouter } from "next/navigation";
import Form from "../Form";
import Input from "./Input";

type Inputs = {
  name: string;
  description: string;
  address: string;
  logo?: File;
};
interface Props {
  user: IUser;
  initialValues?: IRestaurant;
}
const RestaurantForm = ({ user, initialValues = null }: Props) => {
  const router = useRouter();

  const { register, handleSubmit, watch, reset, setValue } = useForm<Inputs>({
    values: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      address: initialValues?.address || "",
    },
  });

  const name = watch("name");
  const description = watch("description");
  const address = watch("address");
  const logo = watch("logo");
  console.log({ logo });

  const handleDeleteRestaurant = async () => {
    const [_, err] = await restaurantsService.deleteRestaurant(
      user?.token,
      initialValues?.id
    );

    if (err) {
      console.log(err);
    } else {
      router.replace(`/users/${user.id}/restaurants`);
    }
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const [res, err] = await restaurantsService.createRestaurant(user.token, {
      name: data.name,
      description: data.description,
      address: data.address,
      logo: data.logo,
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onReset={() => reset()}>
      <Input
        name="name"
        label="Name"
        register={register}
        rules={{ required: !initialValues?.name }}
      />
      <Input
        name="description"
        label="Description"
        register={register}
        rules={{
          required: !initialValues?.description,
        }}
      />
      <Input
        name="address"
        label="Address"
        register={register}
        rules={{ required: !initialValues?.address }}
      />
      <div className="flex flex-row">
        <label
          htmlFor="logo"
          className={`flex w-fit cursor-pointer flex-row gap-2 rounded-lg border ${
            logo
              ? "border-green-600 text-green-600"
              : "border-blue-600 text-blue-600"
          } p-2 font-bold shadow-lg`}
        >
          <UploadCloud />
          <span>{logo ? "Selected" : "Upload Image"}</span>
        </label>
        <input
          id="logo"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple={false}
          className="hidden"
          {...register("logo", { required: !initialValues?.logo })}
          onChange={(e) => {
            setValue("logo", e.target.files[0]);
          }}
        />
      </div>
      <div className="flex gap-4">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
        {initialValues && (
          <Button
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
