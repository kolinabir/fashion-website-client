import axios from "axios";

export const getProduct = async () => {
  return await axios.get(
    "https://mern-ecom-backend-henna.vercel.app/api/product"
  );
};

export const getCartItems = async (id, token) => {
  const data = await axios.get(
    `https://mern-ecom-backend-henna.vercel.app/api/cart/${id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return data.data;
};

export const fetchProduct = async (id) => {
  return await axios.get(
    `https://mern-ecom-backend-henna.vercel.app/api/product/${id}`
  );
};
