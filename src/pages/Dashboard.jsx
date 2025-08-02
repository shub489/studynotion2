import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
  const authLoading = useSelector((state) => state.auth.loading);
  const token = useSelector((state) => state.auth.token);
  const profileLoading = useSelector((state) => state.profile.loading);
  const navigate = useNavigate();

  // 🔁 Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  // 🛑 Don't render anything while redirecting
  if (!token) {
    return <div className="text-richblack-5"></div>;
  }

  // if (authLoading || profileLoading) {
  //   return (
  //     <div className="text-richblack-5 h-[90vh] flex justify-center items-center">
  //       <ClipLoader size={50} color="white" />
  //     </div>
  //   );
  // }
  return (
    <div className="max-w-screen-2xl  mx-auto  min-h-[90vh] flex">
      {/* Sidebar */}
      <div className=" w-[222px]  py-7 bg-richblack-800 border-1 border-richblack-700">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full mb-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
