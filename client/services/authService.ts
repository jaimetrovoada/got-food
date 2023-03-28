import axios from "axios";

const baseUrl = "http://localhost:3001";
const login = async (credentials: { email: string; password: string }) => {
  const res = await axios.post(baseUrl + "/users/login", credentials);

  return { data: res.data, status: res.status };
};

const register = async (payload: {
  name: string;
  email: string;
  password: string;
  role: "customer" | "business";
}) => {
  const res = await axios.post(baseUrl + "/users/register", payload);

  return { data: res.data, status: res.status };
};

export default {
  login,
  register,
};
