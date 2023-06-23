import restaurantsService from "@/lib/restaurants.service";
import { IOrder } from "@/types";
import Button from "../Button";
import CardWrapper from "../CardWrapper";

interface Props {
  order: IOrder | null;
  restaurantId: string;
}
const Details = ({ order, restaurantId }: Props) => {
  return (
    <CardWrapper className="h-3/4 md:p-4">
      <p className="border-b border-white/30 p-2 font-bold uppercase shadow-md">
        Details
      </p>
      {order ? (
        <>
          <div className="flex flex-1 flex-col gap-4 p-2">
            <p className="text-slate-300">Order: #{order?.orderId}</p>
            <div>
              <p>Items:</p>
              {order.orderedItems.map((item) => (
                <ul className="" key={item.item}>
                  <li className="border-b border-b-gray-800 p-2 text-sm text-slate-300 hover:bg-zinc-900/20 lg:text-base">
                    {item.item} - {item.amount}
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <Button
            variant="custom"
            onClick={() =>
              restaurantsService.updateOrder(restaurantId, order.id)
            }
            className="m-2 rounded-2xl bg-blue-500 p-2 font-bold text-white shadow-md transition-colors hover:bg-blue-600"
          >
            Completed
          </Button>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-2">
          <p>Click an order to see details!</p>
        </div>
      )}
    </CardWrapper>
  );
};

export default Details;
