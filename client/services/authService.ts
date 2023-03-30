import axios from "axios";
import config from "@/utils/config";

const login = async (credentials: { email: string; password: string }) => {
  const res = await axios.post(
    `${config.BACKEND_URL}/api/users/login`,
    credentials
  );

  return { data: res.data, status: res.status };
};

const register = async (payload: {
  name: string;
  email: string;
  password: string;
  role: "customer" | "business";
}) => {
  const res = await axios.post(
    `${config.BACKEND_URL}/api/users/register`,
    payload
  );

  return { data: res.data, status: res.status };
};

export default {
  login,
  register,
};
