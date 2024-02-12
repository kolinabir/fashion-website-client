import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes/Routes.jsx";
import AuthProvider from "./Providers/AuthProvider/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";

export const userContext = createContext();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <userContext>
        <AuthProvider>
          <ThemeProvider>
            <div className="">
              <RouterProvider router={Routes}>
                <App />
              </RouterProvider>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </userContext>
    </HelmetProvider>
  </React.StrictMode>
);
