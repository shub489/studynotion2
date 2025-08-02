import React from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ onclick }) => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className=" py-2 px-5 rounded-lg bg-yellow-50 text-richblack-900 flex items-center gap-2"
        onClick={() => navigate("/dashboard/setting")}
      >
        <FaEdit className=" w-[18px] h-[18px]" />

        <span className="font-medium">{"Edit"}</span>
      </button>
    </div>
  );
};

export default EditProfile;
