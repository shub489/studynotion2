import React, { useEffect, useState } from "react";
import LogoFullLight from "../../assets/Logo/LogoFullLight.png";
import { Link, NavLink } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../slices/authSlice";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  console.log("token", token);

  const [navlinks, setNavlinks] = useState([]);

  useEffect(() => {
    async function fetchNavlinks() {
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      console.log(response.data.data);
      setNavlinks(response.data.data);
    }

    fetchNavlinks();
  }, []);

  return (
    <div className="w-full bg-richblack-900  border-b border-richblack-700">
      <div className="max-w-[1440px] mx-4 lg:mx-auto ">
        <div className="max-w-[1260px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="w-[160px] h-8 my-4 ">
            <Link to="/">
              <img src={LogoFullLight} />
            </Link>
          </div>

          {/* Navlinks */}
          <div className="max-w-[816px] font-bold text-richblack-25 flex items-center justify-center gap-7">
            {NavbarLinks.map((navbarLink, index) => {
              return navbarLink.title === "Catalog" ? (
                <span className="relative cursor-pointer group" key={index}>
                  <p>{navbarLink.title}</p>
                  <div className=" absolute left-1/2 -translate-x-1/4 w-[280px] max-h-[300px] overflow-y-auto  bg-white  text-richblack-900 z-20 hidden shadow-lg rounded-lg group-hover:flex flex-wrap gap-3 p-4 grid grid-cols-2">
                    {navlinks.map((navlink) => (
                      <Link
                        key={navlink._id}
                        to={`catalog/${navlink.name.toLowerCase()}`}
                        className=" px-3 py-2 rounded-md hover:bg-yellow-400 hover:text-white transition duration-300 cursor-pointer text-center whitespace-nowrap"
                      >
                        {navlink.name}
                      </Link>
                    ))}
                  </div>
                </span>
              ) : (
                <NavLink
                  to={`${navbarLink.path ? navbarLink.path : ""}`}
                  className={({ isActive }) =>
                    ` ${isActive ? "text-yellow-25 " : "text-richblack-25"}`
                  }
                  key={index}
                >
                  {navbarLink.title}
                </NavLink>
              );
            })}
          </div>

          {/* Login/Signup/Dashboard */}
          <div className=" flex items-center gap-4">
            {/* <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
              Log in
            </button>
            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
              Signup
            </button> */}
            {user && user.accountType === "Instructor" && (
              <Link to="/dashboard/cart">
                <AiOutlineShoppingCart />
                {totalItems > 0 && <span>{totalItems}</span>}
              </Link>
            )}
            {token === null && (
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Login
                </button>
              </Link>
            )}

            {token === null && (
              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Signup
                </button>
              </Link>
            )}

            {token !== null && <ProfileDropdown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
