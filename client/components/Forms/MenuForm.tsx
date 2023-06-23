import restaurantsService from "@/lib/restaurants.service";
import { IMenuItem, LoginResponse } from "@/types";
import { UploadCloud } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import Form from "../Form";
import Input from "./Input";

type Inputs = {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: File;
};

interface MenuFormProps {
  user: LoginResponse;
  slug: string;
  initialValues?: IMenuItem | null;
}

const MenuForm = ({ user, initialValues, slug }: MenuFormProps) => {
  const { register, handleSubmit, watch, reset, setValue } = useForm<Inputs>({
    values: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      price: initialValues?.price || 0,
      category: initialValues?.category || "",
    },
  });

  const name = watch("name");
  const description = watch("description");
  const price = watch("price");
  const category = watch("category");
  const image = watch("image");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const [_, err] = await restaurantsService.addMenuItem(user.token, slug, {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      category: data.category,
      image: data.image,
    });

    if (err) {
      console.log({ err });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onReset={() => reset()}>
      <Input
        label="Name"
        name="name"
        register={register}
        rules={{ required: !initialValues?.name }}
      />

      <Input
        label="Description"
        name="description"
        register={register}
        rules={{ required: !initialValues?.description }}
      />

      <Input
        label="Category"
        name="category"
        register={register}
        rules={{ required: !initialValues?.category }}
      />
      <Input
        label="Price"
        name="price"
        type="number"
        register={register}
        rules={{ required: !initialValues?.price, min: 0 }}
      />

      <div className="flex flex-row">
        <label
          htmlFor="image"
          className={`flex w-fit cursor-pointer flex-row gap-2 rounded-lg border ${
            image
              ? "border-green-600 text-green-600"
              : "border-blue-600 text-blue-600"
          } p-2 font-bold shadow-lg`}
        >
          <UploadCloud />
          <span>{image ? "Selected" : "Upload Image"}</span>
        </label>
        <input
          id="image"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple={false}
          className="hidden"
          {...(register("image"), { required: !initialValues?.name })}
          onChange={(e) => {
            setValue("image", e.target.files[0]);
          }}
        />
      </div>
      <div className="flex gap-4">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default MenuForm;
