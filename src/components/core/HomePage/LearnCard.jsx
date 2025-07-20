import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { PiVectorThreeBold } from "react-icons/pi";

const LearnCard = ({ heading, description, dark, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-full lg:w-[341px] pt-8 px-8 rounded-lg select-none cursor-pointer
    ${
      dark
        ? "bg-richblack-800 text-richblack-5 "
        : "bg-richblack-5 text-richblack-900"
    }
    transition-colors duration-300 ease-in-out
  `}
    >
      <div
        className={`font-semibold text-xl mb-3  ${
          dark ? "text-richblack-25" : "text-richblack-800"
        }`}
      >
        {heading}
      </div>
      <div
        className={`font-normal  mb-12 lg:mb-20  ${
          dark ? "text-richblack-400" : "text-richblack-500"
        }`}
      >
        {description}
      </div>
      <div
        className={`flex justify-between pb-4  ${
          dark ? "text-richblack-300" : "text-richblue-500"
        }`}
      >
        <div className="flex items-center gap-2">
          <FaUserFriends />
          <p className="">Beginner</p>
        </div>
        <div className="flex items-center gap-2">
          <PiVectorThreeBold />
          <p>6 Lessons</p>
        </div>
      </div>
    </div>
  );
};

export default LearnCard;
