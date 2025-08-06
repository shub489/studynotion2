import React from "react";
// import ReactStars from "react-stars";
import { MdDelete } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { ImStarEmpty } from "react-icons/im";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { ImStarFull } from "react-icons/im";

const Card = ({ thumbnail, courseName, category, ratingAndReviews, price }) => {
  return (
    <div className=" w-full flex gap-[20px] ">
      {/* Image */}
      <div className=" w-[185px] h-[145px]">
        <img
          src={thumbnail}
          className="w-full h-full object-cover rounded-md"
          alt="Course thumbnail"
        />{" "}
      </div>

      {/* Details */}
      <div>
        <p className=" text-lg text-richblack-5 font-medium">{courseName}</p>
        <p className=" font-normal text-richblack-400">{category.name}</p>
        <div className=" flex items-center gap-1">
          <span className=" font-semibold text-yellow-100">
            {ratingAndReviews.rating}
          </span>
          <ReactStars
            count={5}
            value={4.5} // 👈 set current rating here
            size={24}
            color2={"#E7C009"}
            edit={false}
            isHalf={true}
            emptyIcon={<ImStarEmpty />}
            halfIcon={<FaRegStarHalfStroke />}
            fullIcon={<ImStarFull />}
            // className="w-[18px] h-[18px]"
          />
          <p className=" text-richblack-400">({ratingAndReviews.count})</p>
        </div>
        <p className=" text-richblack-400 text-sm font-medium">
          Tota Courses • Lesson • Beginner
        </p>
      </div>

      {/* Add and Remove */}
      <div className="  ">
        <button className=" rounded-lg border-1 border-richblack-700 bg-richblack-800 p-3 text-pink-200 flex items-center mb-5">
          <MdDelete className="w-[18px] h-[18px] " />
          <span>Remove</span>
        </button>
        <p className=" text-2xl font-semibold text-yellow-50 text-center">
          Rs {price}
        </p>
      </div>
    </div>
  );
};

export default Card;
