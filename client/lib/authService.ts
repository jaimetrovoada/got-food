import axios from "axios";
import { UserRole } from "@/types";
import { API } from "./constants";

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
    const res = await axios.post<LoginRes>(API.login, credentials);

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
    const res = await axios.post(API.register, payload);
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
    const res = await axios.put(`${API.users}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
