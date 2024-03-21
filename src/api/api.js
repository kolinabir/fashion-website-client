import axios from "axios";

export const getProduct = async () => {
  return await axios.get(
    "https://mern-ecom-backend-henna.vercel.app/api/product"
  );
};
