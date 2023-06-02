export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const API = {
  register: `${BACKEND_URL}/api/users/register`,
  login: `${BACKEND_URL}/api/users/login`,
  users: `${BACKEND_URL}/api/users`,
  restaurants: `${BACKEND_URL}/api/restaurants`,
  trending: `${BACKEND_URL}/api/restaurants/trending`,
};
