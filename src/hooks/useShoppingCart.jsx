import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";
import toast from "react-hot-toast";

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
    // Check if the product is already in the cart
    const existingProductIndex = cartInfo.findIndex(
      (item) => item.productId === product
    );
    if (existingProductIndex !== -1) {
      cartInfo[existingProductIndex].quantity += cartAmount;
      setCartChange(!cartChange);
      localStorage.setItem("cart", JSON.stringify(cartInfo));
      toast.success("Product added to cart!");
      return;
    }
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
