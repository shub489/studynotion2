import React from "react";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

const Cart = () => {
  return (
    <div className=" w-full max-w-1440px py-6">
      <div className="w-full max-w-[1217px] ">
        {/* Part-1 */}
        <div className="   mb-3 px-6">
          <p className="text-sm text-richblack-300">
            Home / Dashboard / Wishlist
          </p>
          <p className="text-3xl text-richblack-5  font-semibold ">
            My Wishlist
          </p>
        </div>

        {/* Part-2 */}
        <div className=" px-6 text-richblack-400 mb-4">
          3 courses in Wishlist
        </div>

        {/* Part-3 */}
        <div className="flex gap-6 p-6 ">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      </div>
    </div>
  );
};

export default Cart;
