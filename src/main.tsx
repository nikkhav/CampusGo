import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import FindRide from "@/pages/FindRide.tsx";
import Login from "@/pages/Login.tsx";
import Register from "@/pages/Register.tsx";
import Profile from "@/pages/Profile.tsx";
import NotFound from "@/pages/NotFound.tsx";
import OfferRide from "@/pages/OfferRide.tsx";
import NewPassword from "@/pages/NewPassword.tsx";
import BookRide from "@/pages/BookRide.tsx";
import Verification from "@/pages/Verification.tsx";
import VerificationProcessing from "@/pages/VerificationProcessing.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/find-ride",
    element: <FindRide />,
  },
  {
    path: "/offer-ride",
    element: <OfferRide />,
  },
  {
    path: "/book/:id",
    element: <BookRide />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },
  {
    path: "/verification",
    element: <Verification />,
  },
  {
    path: "/verification-processing",
    element: <VerificationProcessing />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
