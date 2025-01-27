import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import FindRide from "@/pages/Rides/FindRide.tsx";
import Login from "@/pages/Auth/Login.tsx";
import Register from "@/pages/Auth/Register.tsx";
import Profile from "@/pages/Profile/Profile.tsx";
import NotFound from "@/pages/NotFound.tsx";
import OfferRide from "@/pages/Rides/OfferRide.tsx";
import NewPassword from "@/pages/Auth/NewPassword.tsx";
import BookRide from "@/pages/Rides/BookRide.tsx";
import Verification from "@/pages/Verification/Verification.tsx";
import VerificationProcessing from "@/pages/Verification/VerificationProcessing.tsx";
import Chats from "@/pages/Chats.tsx";
import ContactUs from "@/pages/ContactUs.tsx";
import RateDriver from "@/pages/Ratings/RateDriver.tsx";
import RatePassenger from "@/pages/Ratings/RatePassenger.tsx";
import { ToastContainer } from "react-toastify";
import EmailConfirmed from "@/pages/Auth/EmailConfirmed.tsx";
import ResetPassword from "@/pages/Auth/ResetPassword.tsx";
import YourRides from "@/pages/Rides/YourRides.tsx";
import TrackRide from "@/pages/Rides/TrackRide.tsx";

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
    path: "/track/:id",
    element: <TrackRide />,
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
    path: "/your-rides",
    element: <YourRides />,
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
    path: "/email-confirmed",
    element: <EmailConfirmed />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <RouterProvider router={router} />
  </StrictMode>,
);
