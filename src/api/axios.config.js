import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://salim-store-ecommerce-strapi-v1.onrender.com",
});
