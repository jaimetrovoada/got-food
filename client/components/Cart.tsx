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

  return (
    <section
      className={`container fixed left-1/2 bottom-0 z-10 flex w-full -translate-x-1/2 flex-col rounded-t-2xl border-2 border-b-0 border-black bg-white transition-all ${
        cartExpanded ? "h-5/6" : "h-20"
      }`}
    >
      <div className="relative p-4">
        <Button
          onClick={() => setCartExpanded((prev) => !prev)}
          className=" absolute -top-1/2 left-1/2 mx-auto flex h-8 w-8 translate-y-1/2 translate-x-1/2 items-center justify-center"
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
            <div>
              <Form.Input
                onChange={tableInput}
                name="table"
                id="table"
                variant="row"
                labelText="Table Number"
              />
              {cart.items.map((item) => (
                <div key={item.name}>
                  {item.name} - {item.amount}x
                  <Button
                    className="h-8 w-8 leading-none"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      removeFromCart(item.name);
                    }}
                    type="reset"
                  >
                    -
                  </Button>
                </div>
              ))}
              <div>
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
                >
                  Checkout
                </Button>
              </div>
            </div>
          ) : (
            <div>No items in cart</div>
          ))}
      </div>
    </section>
  );
};

export default Cart;
