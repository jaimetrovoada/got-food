import React from "react";
import Button from "./Button";
import { ICartState } from "@/reducers/cartSlice";
import Form, { Input } from "./Forms/Form";
import { useInput } from "@/hooks";

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
  const [tableValue, tableInput] = useInput("");

  const checkoutDisabled = !tableValue;

  return (
    <section
      className={`container fixed left-1/2 bottom-0 z-10 flex w-full -translate-x-1/2 flex-col rounded-t-2xl border-2 border-b-0 border-black bg-white transition-all ${
        cartExpanded ? "h-5/6" : "h-20"
      }`}
    >
      <div className="relative flex h-full flex-col p-4">
        <Button
          onClick={() => setCartExpanded((prev) => !prev)}
          className="absolute -top-4 left-1/2 flex h-8 w-8 translate-x-1/2 items-center justify-center"
        >
          <span
            className={`leading-none transition-all ${
              cartExpanded ? "rotate-180" : ""
            }`}
          >
            ↑
          </span>
        </Button>
        <h1 className="text-lg font-bold">Total = ${cart?.totalPrice || 0}</h1>
        {cartExpanded &&
          (cart?.items.length ? (
            <div className="flex h-5/6 flex-1 flex-col gap-4">
              <Form.Input
                onChange={tableInput}
                name="table"
                id="table"
                variant="row"
                labelText="Table Number"
                className="rounded-none border-0 border-b-2"
              />
              <ul className="scrollbar flex-1 list-inside list-disc overflow-y-auto py-4">
                {cart.items.map((item) => (
                  <li key={item.name} className="list-item text-gray-700">
                    {item.name} - {item.amount}x
                    <Button
                      className="ml-2 h-8 w-8 leading-none"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        removeFromCart(item.name);
                      }}
                      type="reset"
                    >
                      -
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 self-end">
                <Button
                  className="leading-none"
                  onClick={clearCart}
                  variant="secondary"
                >
                  Clear
                </Button>
                <Button
                  className="leading-none"
                  onClick={() => handleCheckout(Number(tableValue))}
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
