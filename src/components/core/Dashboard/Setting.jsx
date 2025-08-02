import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import EditProfile from "../../comman/EditProfile";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  updatePassword,
  updateProfilePicture,
  updateUser,
  updateProfile,
} from "../../../services/operations/profileAPI";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import LoadingSVG from "../../comman/LoadingSVG";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { useForm } from "react-hook-form";

const Setting = () => {
  const [file, setFile] = useState(null); // FOR IMAGE(PROFILE PICTURE)
  const user = useSelector((state) => state.profile.user);
  const loading = useSelector((state) => state.profile.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      newPassword: "",
      confirmPassword: "",
      gender: user.additionalDetails.gender,
      dateOfBirth: user.additionalDetails.dateOfBirth,
      about: user.additionalDetails.about,
      contactNumber: user.additionalDetails.contactNumber,
    },
  });

  /* PROFILE PICTURE HANDLE */
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  /* API CALL FOR PROFILE UPDATE */
  const handleUploadImage = () => {
    if (!file) {
      toast.error("Please choose a picture first.");
      return;
    }
    const formData = new FormData();
    formData.append("thumbnail", file); // "image" = backend field name
    dispatch(updateProfilePicture(formData));
    setFile(null);
  };

  //   Update FirstName and Lastname
  function submitUserUpdate(data) {
    dispatch(
      updateUser({ firstName: data.firstName, lastName: data.lastName })
    );
  }

  //   Udpate password
  function submitUserPassword(data) {
    dispatch(
      updatePassword({
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      })
    );
  }

  // update profile updateProfile
  function submitUpdateProfile(data) {
    dispatch(
      updateProfile({
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        about: data.about,
        contactNumber: data.contactNumber,
      })
    );
  }

  return (
    <div className=" text-richblack-5 pt-6 ">
      {/* Heading */}
      <div className="w-full pl-6 flex flex-col gap-3 mb-14">
        <div>
          Home / Dashboard / <span>Setting</span>
        </div>
        <div className=" text-3xl ">Setting(Edit Profile)</div>
      </div>

      {/* UPDATE - PROFILE PICTURE*/}
      <div className="max-w-[792px] p-6 ml-[102px] bg-richblack-800 flex gap-5 items-center border-1 border-richblack-700 rounded-lg mb-5">
        <div
          className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat bg-richblack-600"
          style={{ backgroundImage: `url(${user.image})` }}
        ></div>

        <div className="flex flex-col items-start gap-2">
          <p className=" font-medium text-richblack-5">
            {user.firstName} {user.lastName || ""}
          </p>

          <div className="flex gap-3">
            <div className=" flex flex-col items-start gap-1">
              <label className="flex items-center gap-2 cursor-pointer  text-white px-4 py-2 rounded-lg w-fit bg-richblack-700">
                <span className="flex items-center gap-2">
                  <MdOutlineDriveFolderUpload />
                  Choose Picture
                </span>
                {/* Jo file choose kia hai uska name */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {/* Show choosen file name */}
              {file && (
                <p className="text-sm text-richblack-300">
                  Selected:{" "}
                  <span className="font-medium text-yellow-50">
                    {file.name}
                  </span>
                </p>
              )}
            </div>
            <button
              className=" py-[6px] px-[18px] w-24 rounded-lg bg-yellow-50 text-richblack-900 flex justify-center items-center h-fit"
              onClick={handleUploadImage}
              disabled={loading}
            >
              <span className="font-medium">
                {loading ? <LoadingSVG /> : "Upload"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* UPDATE - USER INFORMATION -  FIRSTNAME & LASTNAME*/}
      <div className="max-w-[792px] p-6 ml-[102px] bg-richblack-800  border-1 border-richblack-700 rounded-lg mb-5">
        <p className=" font-semibold text-lg text-richblack-5 mb-5">
          Profile Information
        </p>
        <div className="">
          <form
            className=" flex flex-col gap-5"
            onSubmit={handleSubmit(submitUserUpdate)}
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              {/* Left-1: FIRST NAME */}
              <div className="w-full">
                <p className=" font-normal text-sm text-richblack-5 mb-[6px]">
                  First Name
                </p>
                <input
                  type="text"
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum length is 3",
                    },
                  })}
                  className="w-full p-3 rounded-lg bg-richblack-700 text-richblack-5"
                  placeholder="abc"
                />
                {errors.firstName && (
                  <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Right-1: LAST NAME */}
              <div className="w-full ">
                <p className=" font-normal text-sm text-richblack-5 mb-[6px]">
                  Last Name
                </p>
                <input
                  type="text"
                  {...register("lastName", {
                    minLength: {
                      value: 3,
                      message: "Minimum length is 3",
                    },
                  })}
                  className=" w-full p-3 rounded-lg bg-richblack-700 text-richblack-5"
                  placeholder="Enter Last Name"
                />
                {errors.lastName && (
                  <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <button
              className=" py-[6px] px-[18px] w-24 rounded-lg bg-yellow-50 text-richblack-900 flex justify-center items-center h-fit"
              type="submit"
              disabled={loading}
            >
              <span className="font-medium">
                {loading ? <LoadingSVG /> : "Update"}
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* UPDATE - PASSWORD */}
      <div className="max-w-[792px] p-6 ml-[102px] bg-richblack-800  border-1 border-richblack-700 rounded-lg mb-5">
        <p className=" font-semibold text-lg text-richblack-5 mb-5">Password</p>
        <div className="">
          <form
            className=" flex flex-col gap-5"
            onSubmit={handleSubmit(submitUserPassword)}
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              {/* Left-1: PASSWORD */}
              <div className="w-full">
                <p className=" font-normal text-sm text-richblack-5 mb-[6px]">
                  Password
                </p>
                <input
                  type="newPassword"
                  {...register("newPassword", {
                    // required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum length is 6",
                    },
                  })}
                  className="w-full p-3 rounded-lg bg-richblack-700 text-richblack-5"
                  placeholder="Password"
                />
                {errors.newPassword && (
                  <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Right-1: CONFIRM PASSWORD */}
              <div className="w-full ">
                <p className=" font-normal text-sm text-richblack-5 mb-[6px]">
                  Confirm Password
                </p>
                <input
                  type="text"
                  {...register("confirmPassword", {
                    minLength: {
                      value: 3,
                      message: "Minimum length is 3",
                    },
                  })}
                  className=" w-full p-3 rounded-lg bg-richblack-700 text-richblack-5"
                  placeholder="Enter Confirm Password"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <button
              className=" py-[6px] px-[18px] w-24 rounded-lg bg-yellow-50 text-richblack-900 flex justify-center items-center h-fit"
              type="submit"
              disabled={loading}
            >
              <span className="font-medium">
                {loading ? <LoadingSVG /> : "Update"}
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* UPDATE - GENDER, DATE OF BIRTH, ABOUT, MOBILE NO */}
      <div className="max-w-[792px] p-6 ml-[102px] bg-richblack-800  border-1 border-richblack-700 rounded-lg mb-5">
        <p className=" font-semibold text-lg text-richblack-5 mb-5">
          Additional Details
        </p>
        <div className="">
          <form
            className=" flex flex-col gap-5"
            onSubmit={handleSubmit(submitUpdateProfile)}
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              {/* Left-1: MOBILE NO */}
              <div className="w-full">
                <p className=" font-normal text-sm text-richblack-5 mb-[6px]">
                  Mobile
                </p>
                <input
                  type="text"
                  {...register("contactNumber", {
                    // required: "Password is required",
                    pattern: {
                      value: /^[0-9]{10}$/, // exactly 10 digits
                      message: "Mobile number must be exactly 10 digits",
                    },
                  })}
                  className="w-full p-3 rounded-lg bg-richblack-700 text-richblack-5"
                  placeholder="Mobile Number"
                />
                {errors.contactNumber && (
                  <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>

              {/* Right-1: DATE OF BIRTH */}
              <div className="w-full ">
                <p className=" font-normal text-sm text-richblack-5 mb-[6px]">
                  Date Of Birth
                </p>
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  className=" w-full p-3 rounded-lg bg-richblack-700 text-richblack-5"
                  placeholder="Enter Date of Birth"
                />
                {/* {errors.dateOfBirth && (
                  <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                    {errors.dateOfBirth.message}
                  </p>
                )} */}
              </div>

              {/* Left-2: GENDER */}
              <div className="w-full">
                <p className=" font-normal text-sm text-richblack-5 mb-[6px]">
                  Gender
                </p>
                <select
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                  className="w-full p-3 rounded-lg bg-richblack-700 text-richblack-5"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Right-2: ABOUT */}
              <div className="w-full col-start-1 col-end-3">
                <p className=" font-normal text-sm text-richblack-5 mb-[6px]">
                  About
                </p>
                <textarea
                  type="text"
                  rows={4}
                  {...register("about")}
                  className=" w-full p-3 rounded-lg bg-richblack-700 text-richblack-5"
                  placeholder="Write something about yourself"
                />
                {/* {errors.about && (
                  <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                    {errors.about.message}
                  </p>
                )} */}
              </div>
            </div>

            <button
              className=" py-[6px] px-[18px] w-24 rounded-lg bg-yellow-50 text-richblack-900 flex justify-center items-center h-fit"
              type="submit"
              disabled={loading}
            >
              <span className="font-medium">
                {loading ? <LoadingSVG /> : "Update"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;

{
  /* <div className="w-full">
  <p className=" font-normal text-sm text-richblack-5 mb-[6px]">
    Date of Birth
  </p>
  <input
    type="date"
    {...register("dateOfBirth")}
    className="p-3 rounded-lg bg-richblack-700 text-richblack-5"
    placeholder="abc"
  />
  {errors.lastName && (
    <p className="text-sm text-pink-300 mt-1 text-start font-bold">
      {errors.lastName.message}
    </p>
  )}
</div>; */
}
