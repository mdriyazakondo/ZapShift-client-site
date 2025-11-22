import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  console.log(user.accessToken);
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });
  }, []);
  return axiosSecure;
};

export default useAxiosSecure;
