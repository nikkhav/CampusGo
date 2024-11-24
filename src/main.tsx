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
import Chats from "@/pages/Chats.tsx";
import ContactUs from "@/pages/ContactUs.tsx";
import RateDriver from "@/pages/RateDriver.tsx";
import RatePassenger from "@/pages/RatePassenger.tsx";

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
    path: "/chats",
    element: <Chats />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "/rate-driver/:rideId",
    element: <RateDriver />,
  },
  {
    path: "/rate-passenger/:rideId",
    element: <RatePassenger />,
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
