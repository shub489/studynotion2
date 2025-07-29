import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (password.length <= 6 || confirmPassword.length <= 6) {
      toast.error("Password must be atleast 6 characters long");
      return;
    }
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  }

  return (
    <div className="w-full max-w-[508px] mx-auto p-8">
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2 ">
          <h2 className=" text-3xl font-semibold text-richblack-5">
            Choose a password
          </h2>
          <p className="text-lg font-normal text-richblack-100">
            Almost done. Enter your new password and youre all set.
          </p>
          <label>
            <p className="text-sm font-normal text-richblack-5 mb-1">
              New password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className=" w-full rounded-lg p-3 text-richblack-800 "
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <p className="text-sm font-normal text-richblack-5 mb-1">
              Confirm New password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className=" w-full rounded-lg p-3 text-richblack-800 "
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          {/* TODO: Password guide */}
          <button className="w-full bg-yellow-50 rounded-lg p-3 font-medium mt-9">
            Reset Password
          </button>

          <div className="p-3 rounded-lg">
            <Link
              to={"/login"}
              className="text-richblack-5 flex gap-2 items-center"
            >
              {" "}
              <FaArrowLeftLong />
              <span>Back to Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
