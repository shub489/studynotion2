import React from "react";
import { FaIdBadge } from "react-icons/fa6";

const colorMap = {
  "blue-200": "text-blue-200",
  "pink-200": "text-pink-200",
  "caribbeangreen-200": "text-caribbeangreen-200", // Make sure this exists in Tailwind config
  "yellow-100": "text-yellow-100",
};

const PromiseCard = ({ name, description, Icon, iconColor }) => {
  return (
    <div className="py-4 px-0 lg:px-3 flex gap-6">
      <div
        className={`p-1 w-[52px] h-[52px] rounded-full bg-white flex justify-center items-center ${colorMap[iconColor]}`}
      >
        <Icon className="w-6 lg:w-4 h-6" />
      </div>
      <div>
        <p className="text-lg font-semibold text-richblack-800">{name}</p>
        <p className="text-sm font-normal text-richblack-700">{description}</p>
      </div>
    </div>
  );
};

export default PromiseCard;
