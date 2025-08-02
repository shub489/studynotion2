import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "../Dashboard/SidebarLink";
import { CgProfile } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom";
import * as Icons from "react-icons/vsc";
import { IoIosSettings } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../comman/ConfirmationModal";
import { IoIosLogOut } from "react-icons/io";

// return <SidebarLink link={link} />;

const Sidebar = () => {
  const user = useSelector((state) => state.profile.user);
  const [show, setShow] = useState(false);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("user:", user);
  return (
    <div>
      {sidebarLinks.map((link, index) => {
        if (link.type && link.type !== user.accountType) return null;
        const IconComponent = Icons[link.icon]; // get the right icon
        return (
          <SidebarLink
            key={link.id}
            link={link}
            IconComponent={IconComponent}
          />
        );
      })}

      {/* Setting Button */}
      <SidebarLink
        key={"Setting"}
        link={{ name: "Setting", path: "setting" }}
        IconComponent={IoIosSettings}
      />

      {/* Logout button */}
      <button
        className={`px-6 py-2  flex items-center gap-3 text-richblack-300`}
        onClick={() => setShow(true)}
      >
        {<IoIosLogOut className="w-5 h-5" />}
        <p className=" text-sm">{"Logout"}</p>
      </button>

      {/* Modal - On logout button click */}
      {show && (
        <ConfirmationModal
          show={show}
          setShow={setShow}
          modalRef={modalRef}
          paragraph1={"Are you sure"}
          paragraph2={"You will be logged out of your account."}
          button1={"Logout"}
          button1Handler={() => dispatch(logout(navigate))}
          button2={"cancel"}
          button2Handler={() => setShow(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
