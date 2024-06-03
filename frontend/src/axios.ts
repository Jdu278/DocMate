import axios from "axios";
export const defaultAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});
