"use client";
import Button from "@/components/Button";
import Card from "@/components/Card";
import CardWrapper from "@/components/CardWrapper";
import MenuForm from "@/components/Forms/MenuForm";
import Modal, { ModalHandler } from "@/components/Modal";
import { useToasts } from "@/lib/hooks";
import restaurantsService from "@/lib/restaurantsService";
import { IMenuItem, IUser } from "@/types";
import Image from "next/image";
import { useRef, useState } from "react";
import { Edit3, Trash, XCircle } from "react-feather";

interface Props {
  menu: IMenuItem[];
  user: IUser;
  slug: string;
}

const MenuPage = ({ menu, user, slug }: Props) => {
  const { setSuccessMsg, setErrorMsg } = useToasts();
  const [item, setItem] = useState<IMenuItem>(null);

  const handleDeleteItem = async (id: string) => {
    const [_, err] = await restaurantsService.deleteMenuItem(
      user.token,
      slug,
      id
    );
    if (err) {
      setSuccessMsg("Item deleted");
    } else {
      console.log({ err });
      setErrorMsg("something went wrong");
    }
  };

  const modalRef = useRef<ModalHandler>(null);

  const handleEditItem = (item: IMenuItem) => {
    setItem(item);
    modalRef.current?.show();
  };

  return (
    <section className="mx-auto w-full max-w-screen-md overflow-hidden pb-10">
      <Modal ref={modalRef}>
        <div className="z-50 flex w-full max-w-screen-md flex-col rounded-2xl border border-gray-200 bg-white p-2 shadow-lg">
          <Button
            variant="tertiary"
            onClick={() => modalRef?.current.hide()}
            className="ml-auto text-red-700"
          >
            <XCircle />
          </Button>
          {item ? (
            <MenuForm user={user} slug={slug} initialValues={item} />
          ) : (
            <MenuForm user={user} slug={slug} />
          )}
        </div>
      </Modal>
      <CardWrapper>
        <Button
          variant="custom"
          className="w-full rounded-lg bg-blue-200/50 p-4 font-bold text-blue-600"
          onClick={() => {
            modalRef.current?.show();
            setItem(null);
          }}
        >
          Add item
        </Button>
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto scrollbar-none">
          {menu.length > 0 &&
            menu?.map((item) => (
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

export default MenuPage;

interface MenuCardProps {
  item: IMenuItem;
  deleteItem: (id: string) => void;
  editItem: (item: IMenuItem) => void;
}
const MenuCard = ({ item, editItem, deleteItem }: MenuCardProps) => {
  return (
    <div className="group flex flex-row items-center justify-between gap-4 border-b border-gray-200 py-2 px-4 hover:bg-gray-50">
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
          <p className="w-fit rounded-full bg-gray-50 px-2 py-1.5 text-xs font-medium capitalize text-gray-600 group-hover:bg-gray-100">
            {item.category}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="custom" onClick={() => editItem(item)}>
          <Edit3 className="mr-2 stroke-blue-400" />
        </Button>
        <Button variant="custom" onClick={(e) => deleteItem(item.id)}>
          <Trash className="stroke-red-400" />
        </Button>
      </div>
    </div>
  );
};
