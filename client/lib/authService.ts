import axios from "axios";
import config from "@/utils/config";
import { UserRole } from "@/types";

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
  try {
    const res = await axios.post<LoginRes>(
      `${config.BACKEND_URL}/api/users/login`,
      credentials
    );

    return [res.data, null] as [LoginRes, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const register = async (payload: {
  name: string;
  email: string;
  password: string;
  role: "customer" | "business";
}) => {
  try {
    const res = await axios.post(
      `${config.BACKEND_URL}/api/users/register`,
      payload
    );
    return [res.status, null] as [number, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const updateUser = async (
  token: string,
  id: string,
  payload: {
    name: string;
    email: string;
    password: string;
    role: string;
  }
) => {
  try {
    const res = await axios.put(
      `${config.BACKEND_URL}/api/users/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return [res.status, null] as [number, null];
  } catch (err) {
    return [null, err] as [null, Error];
  }
};

const authService = {
  login,
  register,
  updateUser,
};

export default authService;
