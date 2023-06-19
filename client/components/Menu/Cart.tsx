import { ICartState } from "@/lib/reducers/cartSlice";
import React from "react";
import { ArrowUp, Minus } from "react-feather";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Forms/Input";

interface Props {
  cartExpanded: boolean;
  setCartExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  cart: ICartState;
  removeFromCart: (itemName: string) => void;
  handleCheckout: (tableNumber: number) => void;
  clearCart: () => void;
}

const Cart = ({
  cart,
  cartExpanded,
  setCartExpanded,
  clearCart,
  handleCheckout,
  removeFromCart,
}: Props) => {
  const { register, reset, watch } = useForm<{ table: number }>({
    defaultValues: {
      table: 0,
    },
  });

  const table = watch("table");
  const checkoutDisabled = !table;

  return (
    <section
      className={`container fixed left-1/2 bottom-0 z-10 flex w-full -translate-x-1/2 flex-col rounded-t-2xl border border-gray-600/50 border-b-0 bg-neutral-950 transition-all ${
        cartExpanded ? "h-5/6" : "h-20"
      }`}
    >
      <div className="relative flex h-full flex-col p-4">
        <Button
          onClick={() => setCartExpanded((prev) => !prev)}
          className="absolute -top-4 left-1/2 flex h-8 w-8 translate-x-1/2 items-center justify-center"
        >
          <ArrowUp className={cartExpanded ? "rotate-180" : ""} />
        </Button>
        <p className="text-lg font-semibold">Total = ${cart?.totalPrice || 0}</p>
        {cartExpanded &&
          (cart?.items.length ? (
            <div className="flex h-5/6 flex-1 flex-col gap-4">
                <Input
                  label="Table:"
                  variant="row"
                  {...register("table", {
                    required: true,
                    min: 1,
                  })}
                  type="number"
                  id="table"
                  className="w-10 p-0 px-1"
                />
              <ul className="flex-1 list-inside list-disc overflow-y-auto py-4 scrollbar">
                {cart.items.map((item) => (
                  <li key={item.name} className="list-item text-slate-300">
                    {item.name} - {item.amount}x
                    <Button
                      className="ml-2 !rounded-full p-1"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        removeFromCart(item.name);
                      }}
                      type="reset"
                      variant="secondary"
                    >
                      <Minus size={16} />
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 self-end">
                <Button
                  className="leading-none"
                  onClick={clearCart}
                  variant="secondary"
                  useResetStyles
                >
                  Clear
                </Button>
                <Button
                  className="leading-none"
                  onClick={() => {
                    reset();
                    handleCheckout(Number(table));
                  }}
                  disabled={checkoutDisabled}
                >
                  Checkout
                </Button>
              </div>
            </div>
          ) : (
            <div>No items in the cart</div>
          ))}
      </div>
    </section>
  );
};

export default Cart;
