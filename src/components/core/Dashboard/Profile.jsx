import React from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import EditProfile from "../../comman/EditProfile";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Profile = () => {
  const user = useSelector((state) => state.profile.user);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("Location", location);

  return (
    <div className=" text-richblack-5 pt-6 ">
      {/* Heading */}
      <div className="w-full pl-6 flex flex-col gap-3 mb-14">
        <div>
          Home / Dashboard / <span>Profile</span>
        </div>
        <div className=" text-3xl ">My Profile</div>
      </div>

      {/* Name email and photo */}
      <div className="max-w-[792px] p-6 ml-[102px] bg-richblack-700 flex justify-between items-center border-1 border-richblack-700 rounded-lg mb-5">
        <div className="flex items-center gap-6">
          <img src={user.image} className="w-20 h-20 rounded-full" />
          <div>
            <p className="text-lg font-semibold text-richblack-5">
              {user.firstName} {user.lastName || ""}
            </p>
            <p className="text-sm text-richblack-300">{user.email}</p>
          </div>
        </div>
        <EditProfile onclick={() => navigate("/dashboard/setting")} />
      </div>

      {/* About */}

      {/* <div className="max-w-[792px] p-6 ml-[102px] bg-richblack-700 flex justify-between items-center border-1 border-richblack-700 rounded-lg"> */}
      <div className="max-w-[792px] p-6 ml-[102px] bg-richblack-700  border-1 border-richblack-700 rounded-lg mb-5">
        <div className="flex justify-between items-center mb-8">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <EditProfile onclick={() => navigate("/dashboard/setting")} />
        </div>
        <div className="text-sm text-richblack-300">
          {user.additionalDetails.about || "Write something about yourself."}
        </div>
      </div>

      {/* Personal Details */}
      <div className="max-w-[792px] p-6 ml-[102px] bg-richblack-700  border-1 border-richblack-700 rounded-lg">
        <div className="flex justify-between items-center mb-5">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <EditProfile onclick={() => navigate("/dashboard/setting")} />
        </div>

        {/* Details */}
        <div className=" grid grid-cols-2 gap-x-8 gap-y-5">
          {/* Left Column */}
          <div>
            <p className="text-sm font-normal text-richblack-400">First Name</p>
            <p className="font-medium text-sm text-richblack-5">
              {user.firstName}
            </p>
          </div>
          {/* Right Column */}
          <div>
            <p className="text-sm font-normal text-richblack-400">Last Name</p>
            <p className="font-medium text-sm text-richblack-5">
              {user.lastName}
            </p>
          </div>

          {/* Left Column */}
          <div>
            <p className="text-sm font-normal text-richblack-400">Email</p>
            <p className="font-medium text-sm text-richblack-5">{user.email}</p>
          </div>
          {/* Right Column */}
          <div>
            <p className="text-sm font-normal text-richblack-400">
              Phone Number
            </p>
            <p className="font-medium text-sm text-richblack-5">
              {user.additionalDetails.contactNumber || "Add phone no"}
            </p>
          </div>

          {/* Left Column */}
          <div>
            <p className="text-sm font-normal text-richblack-400">Gender</p>
            <p className="font-medium text-sm text-richblack-5">
              {user.additionalDetails.gender.charAt(0).toUpperCase() +
                user.additionalDetails.gender.slice(1) || "Add Gender"}
            </p>
          </div>
          {/* Right Column */}
          <div>
            <p className="text-sm font-normal text-richblack-400">
              Date of Birth
            </p>
            <p className="font-medium text-sm text-richblack-5">
              {user.additionalDetails.dateOfBirth
                ? dayjs(user.additionalDetails.dateOfBirth).format(
                    "D MMMM YYYY"
                  )
                : "Add Date of Birth"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
