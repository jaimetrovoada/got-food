import restaurantsService from "@/lib/restaurants.service";
import { IMenuItem, LoginResponse } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import Form from "../Form";
import Input from "./Input";
import ImageInput from "./ImageInput";
import { Loader } from "lucide-react";
import { useToast } from "../ui/use-toast";

type Inputs = {
  name: string;
  description: string;
  price: number;
  category: string;
  image: FileList;
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
    formState: { errors, isSubmitting },
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
  const { toast } = useToast();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const [_, err] = await restaurantsService.addMenuItem(user.token, slug, {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      category: data.category,
      image: data.image[0],
    });

    if (err) {
      console.log({ err });
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success",
      description: "Menu item created successfully",
    });
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
        <Button type="submit">{
          isSubmitting
            ? <Loader className="mr-2 h-4 w-4 animate-spin" />
            : "Submit"
        }</Button>
      </div>
    </Form>
  );
};

export default MenuForm;
