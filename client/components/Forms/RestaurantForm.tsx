"use client";
import { useToasts } from "@/lib/hooks";
import restaurantsService from "@/lib/restaurantsService";
import { IRestaurant, IUser } from "@/types";
import { Trash, UploadCloud } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import { useRouter } from "next/navigation";

interface Inputs {
  name: string;
  description: string;
  address: string;
  logo?: File;
}
interface Props {
  user: IUser;
  initialValues?: IRestaurant;
}
const RestaurantForm = ({ user, initialValues = null }: Props) => {
  const router = useRouter();
  const { setSuccessMsg, setErrorMsg } = useToasts();

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
    try {
      const res = await restaurantsService.deleteRestaurant(
        user?.token,
        initialValues?.id
      );

      if (res.status === 200) {
        setSuccessMsg("Restaurant deleted successfully");
        router.replace(`/users/${user.id}/restaurants`);
      }
      console.log({ res });
    } catch (error) {
      console.log({ delError: error });
      setErrorMsg("Something went wrong");
    }
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await restaurantsService.createRestaurant(user.token, {
        name: data.name,
        description: data.description,
        address: data.address,
        logo: data.logo,
      });

      if (res.status === 201) {
        setSuccessMsg("Restaurant created");
      }
    } catch (err) {
      setErrorMsg("something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      className={
        initialValues
          ? "flex flex-col gap-4 rounded-2xl border-2 border-black/50 bg-white p-4 shadow-custom"
          : "flex flex-col gap-4 p-4"
      }
    >
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          className="rounded-xl border p-2 focus:outline-none"
          {...register("name", { required: !initialValues?.name })}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          className="rounded-xl border p-2 focus:outline-none"
          {...register("description", {
            required: !initialValues?.description,
          })}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          className="rounded-xl border p-2 focus:outline-none"
          {...register("address", { required: !initialValues?.address })}
        />
      </div>
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
    </form>
  );
};

export default RestaurantForm;
