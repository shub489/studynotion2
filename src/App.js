import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/comman/Navbar";
import { configureStore } from "@reduxjs/toolkit";
import OpenRoute from "./components/core/Auth/OpenRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Profile from "./components/core/Dashboard/Profile";
import { useSelector } from "react-redux";
import Setting from "./components/core/Dashboard/Setting";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";

function App() {
  const user = useSelector((store) => store.profile.user);
  console.log("user ", user);
  return (
    <div
      className={` w-screen min-h-screen bg-richblack-900 flex flex-col font-inter`}
    >
      {/* Navbar */}
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route
            path="login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route
            path="forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />
          <Route
            path="update-password/:token"
            element={
              <OpenRoute>
                <ResetPassword />
              </OpenRoute>
            }
          />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="my-profile" replace />} />
            <Route path="my-profile" element={<Profile />} />
            <Route path="enrolled-courses" element={<EnrolledCourses />} />
            <Route path="purchase-history" element={<About />} />
            <Route path="setting" element={<Setting />} />
            {user.accountType === "Student" && (
              <Route path="cart" element={<Cart />} />
            )}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
