import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, SetEmailSent] = useState(false);
  const dispatch = useDispatch();

  function sendEmail(e) {
    e.preventDefault();
    console.log("email sent ", email, isEmailSent);
    dispatch(getPasswordResetToken(email, SetEmailSent));
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  return (
    <div className="w-full  max-w-[508px] mx-auto  mt-6  p-6 ">
      <div className="">
        <form onSubmit={sendEmail}>
          <h2 className="font-semibold text-3xl mb-3 text-richblack-5">
            {isEmailSent ? "Check Email" : "Reset Your Password"}
          </h2>
          <p className=" font-normal text-richblack-100 mb-9">
            {isEmailSent
              ? `We have sent the reset email to ${email}`
              : "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"}
          </p>
          {/* <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
        </label> */}
          {!isEmailSent && (
            <label className="w-full">
              <p className="text-sm font-normal text-richblack-5 mb-1">
                Email Address <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="text"
                placeholder="myemailaddress@gmail.com"
                name="email"
                value={email}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className=" w-full rounded-lg p-3 text-richblack-800 "
                onChange={(e) => handleEmailChange(e)}
              />
            </label>
          )}
          {isEmailSent ? (
            <button className="w-full bg-yellow-50 rounded-lg p-3 font-medium mt-9">
              Resend Email
            </button>
          ) : (
            <button
              className="w-full bg-yellow-50 rounded-lg p-3 font-medium mt-9"
              type="submit"
            >
              Reset Password
            </button>
          )}
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

export default ForgotPassword;
