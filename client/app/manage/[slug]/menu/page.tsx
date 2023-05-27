"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import MenuForm from "@/components/Forms/MenuForm";
import Modal, { ModalHandler } from "@/components/Modal";
import {
  useFileInput,
  useInput,
  useRestaurantMenu,
  useToasts,
} from "@/lib/hooks";
import { RootState } from "@/lib/reducers/store";
import restaurantsService from "@/lib/restaurantsService";
import { useParams } from "next/navigation";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { IMenuItem } from "@/types";
import CardWrapper from "@/components/CardWrapper";

const Page = () => {
  const { setSuccessMsg, setErrorMsg } = useToasts();

  const user = useSelector((state: RootState) => state.user);

  const params = useParams();
  const slug = params?.slug as string;

  const { menu } = useRestaurantMenu(slug);

  const [nameValue, handleNameChange, setNameValue] = useInput("");
  const [descriptionValue, handleDescriptionChange, setDescriptionValue] =
    useInput("");
  const [priceValue, handlePriceChange, setPriceValue] = useInput("");
  const [categoryValue, handleCategoryChange, setCategoryValue] = useInput("");
  const [imageValue, handleImageChange] = useFileInput();

  const formHandlers = {
    handleSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("handleSubmit");
      try {
        const res = await restaurantsService.addMenuItem(user.token, slug, {
          name: nameValue,
          description: descriptionValue,
          price: Number(priceValue),
          category: categoryValue,
          image: imageValue,
        });
        console.log({ res });
        if (res.status === 201) {
          setSuccessMsg("Item added");
        }
      } catch (err) {
        console.log({ err });
        setErrorMsg("something went wrong");
      }
    },
    handleNameChange,
    handleDescriptionChange,
    handlePriceChange,
    handleImageChange,
    handleCategoryChange,
    nameValue,
    descriptionValue,
    priceValue,
    imageValue,
    categoryValue,
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const res = await restaurantsService.deleteMenuItem(user.token, slug, id);
      console.log({ res });
      if (res.status === 200) {
        setSuccessMsg("Item deleted");
      }
    } catch (err) {
      console.log({ err });
      setErrorMsg("something went wrong");
    }
  };

  const modalRef = useRef<ModalHandler>(null);

  const editModalRef = useRef<ModalHandler>(null);

  const handleEditItem = (item: IMenuItem) => {
    setNameValue(item.name);
    setDescriptionValue(item.description);
    setPriceValue(item.price.toString());
    setCategoryValue(item.category);
    editModalRef.current?.show();
  };

  const editFormHandlers = {
    handleSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("handleSubmit");
    },
    handleNameChange,
    handleDescriptionChange,
    handlePriceChange,
    handleImageChange,
    handleCategoryChange,
    nameValue,
    descriptionValue,
    priceValue,
    imageValue,
    categoryValue,
  };

  return (
    <section className="mx-auto w-full max-w-screen-md overflow-hidden pb-10">
      <Modal ref={modalRef}>
        <MenuForm {...formHandlers} />
      </Modal>
      <Modal ref={editModalRef}>
        <MenuForm {...editFormHandlers} />
      </Modal>
      <CardWrapper>
        <Button
          variant="custom"
          className="w-full rounded-lg bg-blue-200/50 p-4 font-bold text-blue-600"
          onClick={() => modalRef.current?.show()}
        >
          Add item
        </Button>
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto scrollbar-hide">
          {menu?.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              deleteItem={handleDeleteItem}
              editItem={handleEditItem}
            />
          ))}
        </div>
      </CardWrapper>
    </section>
  );
};

export default Page;
interface MenuCardProps {
  item: IMenuItem;
  deleteItem: (id: string) => void;
  editItem: (item: IMenuItem) => void;
}
const MenuCard = ({ item, editItem, deleteItem }: MenuCardProps) => {
  return (
    <Card className="flex flex-row items-center justify-between border-black/10 shadow-sm">
      <div className="flex flex-row gap-2 rounded-l-2xl">
        <Image
          src={item.image}
          alt={`image of the dish - ${item.name}`}
          width={50}
          height={50}
          className="h-auto w-auto rounded-l-2xl object-cover"
        />
        <div className="flex flex-col gap-2 p-2">
          <p className="text-xl font-bold">{item.name}</p>
          <p className="text-gray-500">{item.description}</p>
        </div>
      </div>
      <div className="p-2">
        <p className="text-lg font-bold">${item.price}</p>
        <Button
          variant="custom"
          onClick={() => editItem(item)}
          className="h-8 w-8 leading-none"
        >
          ✒️
        </Button>
        <Button
          variant="custom"
          onClick={(e) => deleteItem(item.id)}
          className="h-8 w-8 leading-none"
        >
          🗑️
        </Button>
      </div>
    </Card>
  );
};
