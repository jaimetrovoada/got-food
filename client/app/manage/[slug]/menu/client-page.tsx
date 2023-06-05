"use client";
import Button from "@/components/Button";
import CardWrapper from "@/components/CardWrapper";
import MenuForm from "@/components/Forms/MenuForm";
import Modal, { ModalHandler } from "@/components/Modal";
import { useToasts } from "@/lib/hooks";
import restaurantsService from "@/lib/restaurantsService";
import { IMenuItem, IUser } from "@/types";
import { useRef, useState } from "react";
import { XCircle } from "react-feather";
import { MenuItem as Item } from "@/components/Manage";

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
              <Item
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
