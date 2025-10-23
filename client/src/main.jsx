import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
// import { PostContextProvider } from "./context/PostContext.jsx";
// import { CommentsContextProvider } from "./context/CommentsContext.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext";
import "react-toastify/dist/ReactToastify.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Clerk publishable key not found");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <PostContextProvider> */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AuthContextProvider>
        {/* <CommentsContextProvider> */}
        <SocketContextProvider>
          <ThemeProvider>
            <App />
            <ToastContainer
              position="bottom-left"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </ThemeProvider>
        </SocketContextProvider>
        {/* </CommentsContextProvider> */}
      </AuthContextProvider>
    </ClerkProvider>
    {/* </PostContextProvider> */}
  </React.StrictMode>
);
