import React from "react";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ link, IconComponent }) => {
  return (
    <NavLink
      to={`${link.path}`}
      className={({ isActive }) =>
        `px-6 py-2  flex items-center gap-3 border-l-2 ${
          isActive
            ? "text-yellow-50 bg-yellow-800 border-l-yellow-25"
            : "text-richblack-300 border-l-transparent"
        }`
      }
    >
      {/* <CgProfile className="w-4 h-4 " /> */}
      {IconComponent && <IconComponent className="w-5 h-5" />}

      <p className=" text-sm">{link.name}</p>
    </NavLink>
  );
};

export default SidebarLink;
