import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes/Routes.jsx";
import AuthProvider from "./Providers/AuthProvider/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const userContext = createContext();
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
