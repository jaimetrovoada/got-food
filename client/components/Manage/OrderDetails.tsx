import restaurantsService from "@/lib/restaurantsService";
import { IOrder } from "@/types";
import Button from "../Button";

interface Props {
  order: IOrder | null;
  restaurantId: string;
}
const Details = ({ order, restaurantId }: Props) => {
  return (
    <aside className="hidden w-1/3 flex-col rounded-2xl border border-gray-600 bg-white shadow-lg transition-all md:flex">
      <p className="border-b border-black/50 p-2 font-bold uppercase shadow-md">
        Details
      </p>
      {order ? (
        <>
          <div className="flex flex-1 flex-col gap-4 p-2">
            <p>Order: #{order?.orderId}</p>
            <div>
              <p>Items:</p>
              {order.orderedItems.map((item) => (
                <ul className="list-inside list-disc" key={item._id}>
                  <li className="list-item text-gray-700">
                    {item.item.name} - {item.amount}
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
    </aside>
  );
};

export default Details;
