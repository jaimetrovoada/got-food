import React from "react";
import Button from "./Button";
import { ICartState } from "@/reducers/cartSlice";

interface Props {
  cartExpanded: boolean;
  setCartExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  cart: ICartState;
  removeFromCart: (itemName: string) => void;
  handleCheckout: () => void;
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
  return (
    <section
      className={`flex w-full flex-col bg-white transition-all ${
        cartExpanded ? "absolute bottom-0 z-10 h-5/6" : "h-20"
      }`}
    >
      <Button
        onClick={() => setCartExpanded((prev) => !prev)}
        className="mx-auto -mt-5 flex h-8 w-8 items-center justify-center"
      >
        <span
          className={`leading-none transition-all ${
            cartExpanded ? "rotate-180" : ""
          }`}
        >
          ↑
        </span>
      </Button>
      <h1>Total = ${cart?.totalPrice || 0}</h1>
      {cartExpanded &&
        (cart?.items.length ? (
          <>
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
              <Button className="leading-none" onClick={clearCart}>
                Clear
              </Button>
              <Button className="leading-none" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </>
        ) : (
          <div>No items in cart</div>
        ))}
    </section>
  );
};

export default Cart;
