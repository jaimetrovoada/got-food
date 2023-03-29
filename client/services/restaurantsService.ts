import axios from "axios";

const createRestaurant = async (payload: {
  name: string;
  description: string;
  address: string;
  logo: File | undefined;
}) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  console.log({ token, payload });
  const res = await axios.post("http://localhost:3001/restaurants", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return {
    restaurant: res.data,
    status: res.status,
  };
};

export default { createRestaurant };
