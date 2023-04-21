import axios from "axios";
import config from "@/utils/config";

enum UserRole {
  CUSTOMER = "customer",
  BUSINESS = "business",
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  restaurants: string[];
}
interface LoginRes {
  user: User;
  token: string;
}

const login = async (credentials: Record<"email" | "password", string>) => {
  console.log({ credentials });
  const res = await axios.post<LoginRes>(
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
