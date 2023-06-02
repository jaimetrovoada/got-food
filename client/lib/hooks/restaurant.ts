import { useEffect, useState } from "react";

export const useRestaurantOrders = (restaurantId: string) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:3001/api/restaurants/${restaurantId}/data-stream`
    );

    eventSource.onmessage = (event) => {
      const order = JSON.parse(event.data);
      console.log({ order });
      setOrders((prevOrders) => [...prevOrders, order]);
    };

    eventSource.onerror = (error) => {
      console.error("Error in SSE:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [restaurantId]);

  return orders;
};
