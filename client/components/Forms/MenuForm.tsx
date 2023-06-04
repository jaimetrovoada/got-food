import { useToasts } from "@/lib/hooks";
import restaurantsService from "@/lib/restaurantsService";
import { IUser } from "@/types";
import { UploadCloud } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";

interface Inputs {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: File;
}

interface MenuFormProps {
  user: IUser;
  slug: string;
  initialValues?: {
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
  };
}

const MenuForm = ({ user, initialValues, slug }: MenuFormProps) => {
  const { setSuccessMsg, setErrorMsg } = useToasts();

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
      setErrorMsg("something went wrong");
    } else {
      setSuccessMsg("Item added");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      className="flex flex-col gap-4 p-4"
    >
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          className="rounded-xl border p-2 focus:outline-none"
          {...register("name", { required: !initialValues?.name })}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="description">Description</label>
        <input
          className="rounded-xl border p-2 focus:outline-none"
          {...register("description", { required: !initialValues?.name })}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="category">Category</label>
        <input
          className="rounded-xl border p-2 focus:outline-none"
          {...register("category", { required: !initialValues?.name })}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="price">Price</label>
        <div className="flex w-full flex-row">
          <span className="rounded-xl rounded-r-none border bg-gray-200 p-2 text-gray-600">
            $
          </span>
          <input
            className="flex-1 rounded-xl rounded-l-none border p-2 focus:outline-none"
            type="number"
            {...register("price", { min: 0, required: !initialValues?.name })}
          />
        </div>
      </div>

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
    </form>
  );
};

export default MenuForm;
