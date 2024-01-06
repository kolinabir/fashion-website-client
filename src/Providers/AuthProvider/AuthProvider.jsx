import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("https://mern-ecom-backend-henna.vercel.app/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.data.user);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = (username, password) => {
    setLoading(true);
    const service = { username, password };
    fetch("https://mern-ecom-backend-henna.vercel.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        setUser(data.data.user);
        setLoading(false);
        Swal.fire({
          title: "Success!",
          text: "Login successfully!",
          icon: "success",
          confirmButtonText: "Cool",
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const authInfo = {
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={{ ...authInfo, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
