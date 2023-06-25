import restaurantsService from "@/lib/restaurants.service";
import { IMenuItem, LoginResponse } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import Form from "../Form";
import Input from "./Input";
import ImageInput from "./ImageInput";

type Inputs = {
  name: string;
  description: string;
  price: number;
  category: string;
  image: File;
};

interface MenuFormProps {
  user: LoginResponse;
  slug: string;
  initialValues?: IMenuItem | null;
}

const MenuForm = ({ user, initialValues, slug }: MenuFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    values: {
      name: initialValues?.name || null,
      description: initialValues?.description || null,
      price: initialValues?.price || 0,
      category: initialValues?.category || null,
      image: null,
    },
  });

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
        rules={{ required: !initialValues }}
      />

      <Input
        label="Description"
        name="description"
        register={register}
        rules={{ required: !initialValues }}
      />

      <Input
        label="Category"
        name="category"
        register={register}
        rules={{ required: !initialValues }}
      />
      <Input
        label="Price"
        name="price"
        type="number"
        register={register}
        rules={{ required: !initialValues, min: 0 }}
      />

      <ImageInput
        name="image"
        register={register}
        rules={{ required: !initialValues }}
        error={errors.image}
        isSelected={!!image || !!initialValues}
      />
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
