import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";

const useShoppingCart = () => {
  const { user, cartChange, setCartChange } = useContext(AuthContext);

  const addToCart = (product, cartAmount) => {
    // Logic to add product to cart
    fetch(
      "https://mern-ecom-backend-henna.vercel.app/api/cart/addProductToCart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          products: [
            {
              productId: product,
              quantity: Number(cartAmount),
            },
          ],
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Product added to cart!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveToLocalCart = (product, cartAmount) => {
    // Save cart data to localStorage if user is not logged in
    const cartInfo = JSON.parse(localStorage.getItem("cart")) || [];
    const newCartItem = {
      productId: product,
      quantity: cartAmount,
    };
    cartInfo.push(newCartItem);
    setCartChange(!cartChange);
    localStorage.setItem("cart", JSON.stringify(cartInfo));

    toast.success("Product added to cart!");
  };

  const handleAddToCart = (product, cartAmount) => {
    console.log(product);
    if (user) {
      addToCart(product, cartAmount);
    } else {
      saveToLocalCart(product, cartAmount);
    }
  };

  return { addToCart, saveToLocalCart, handleAddToCart };
};

export default useShoppingCart;
