import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await fetch(
            "https://mernecomnoor.vercel.app/api/auth/check-auth",
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (response.ok) {
            const data = await response.json(); // Convert the ReadableStream to JSON
            // console.log(data);
            setUser(data.data); // Assuming the user object is directly under the "user" key in the response data
          } else {
            // Handle invalid token or other errors
            console.error("Error fetching user details");
            localStorage.removeItem("token");
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user details", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const signIn = async (username, password) => {
    setLoading(true);
    const service = { username, password };

    try {
      const response = await fetch(
        "https://mernecomnoor.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(service),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.data.token);
        toast.success("Login successful!");

        setUser(data.data.user);
        return data;
      } else {
        // Handle login failure
        return Promise.reject("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login", error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const [cartChange, setCartChange] = useState(false);
  const authInfo = {
    user,
    loading,
    signOut,
    cartChange,
    setCartChange,
  };

  return (
    <AuthContext.Provider value={{ ...authInfo, signIn, signOut }}>
      {children}
      <Toaster position="bottom-right" reverseOrder={false} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
