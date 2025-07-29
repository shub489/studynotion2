import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { TbReload } from "react-icons/tb";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  //   const { accountType, firstName, lastName, email, password, confirmPassword } =
  //     useSelector((state) => state.auth.signupData);

  const signupData = useSelector((state) => state.auth.signupData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    console.log("Handle submit called", otp);
    console.log({ ...signupData }, otp, navigate);
    dispatch(
      signUp({
        ...signupData,
        otp,
        navigate,
      })
    );
  }

  return (
    <div className="max-w-[508px] mx-auto p-8 border-2 border-pink-100">
      <div className=" flex flex-col gap-2">
        <div className="text-3xl font-semibold text-richblack-5">
          Verify Email
        </div>
        <div className=" text-lg text-richblack-100">
          A verification code has been sent to you. Enter the code below
        </div>
        {/* <div> */}
        <form onSubmit={handleSubmit}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            className="rounded-lg p-3 text-richblack-800"
            style={{ boxShadow: "0px -1px 0px 0px #FFFFFF2E inset" }}
          />
          {/* </div> */}
          <button className="w-full bg-yellow-50 rounded-lg p-3 font-medium mt-9">
            Verify Email
          </button>
        </form>
        <div className="p-3 rounded-lg flex justify-between">
          <Link
            to={"/login"}
            className="text-richblack-5 flex gap-2 items-center"
          >
            {" "}
            <FaArrowLeftLong />
            <span>Back to Login</span>
          </Link>
          <button
            className="flex items-center gap-1"
            onClick={() => {
              dispatch(sendOtp(signupData.email, navigate));
            }}
          >
            {" "}
            <TbReload className="w-[18px] h-[18px] text-blue-100" />
            <span className="font-medium text-blue-100">Resend it </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
