import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../Config/firebase.config";
import axios from "axios";

export const AuthContext = createContext();

const auth = getAuth(app);

const googlProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Google Login
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googlProvider);
  };

  // sign with email password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // create user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Logout button
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // for observe user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("user in the state change", currentUser);
      const userEmail = currentUser?.email || user.email;
      const loggedEmail = { email: userEmail };
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        axios
          .post("https://fashion-server-nine.vercel.app/jwt", loggedEmail, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          });
      } else {
        axios.post("https://fashion-server-nine.vercel.app/logout", loggedEmail, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
        });

      }
    });
    return () => {
      unSubscribe();
    };
  }, [user]);

  const authInfo = {
    user,
    loading,
    googleSignIn,
    createUser,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
