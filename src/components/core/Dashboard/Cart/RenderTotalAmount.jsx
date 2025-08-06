import React from "react";

const RenderTotalAmount = () => {
  return (
    <div className=" max-w-[282px] rounded-lg border-1 border-richblack-700 bg-richblack-800 h-fit p-6">
      <div className=" w-[234px] flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className=" text-sm font-semibold text-richblack-200">Total</p>
          <p className=" text-2xl text-yellow-50 font-semibold">Rs 4500</p>
          <p className=" text-sm text-richblack-300">
            <del>Rs 3500</del>
          </p>
        </div>
        <button className=" rounded-lg py-3 px-6 bg-yellow-50 text-richblack-900 font-medium">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default RenderTotalAmount;
