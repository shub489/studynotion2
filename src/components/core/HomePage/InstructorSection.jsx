import React from "react";
import HighlightText from "./HighlightText";
import CTAButton from "./CTAButton";
import Instructor from "../../../assets/Images/Instructor.png";

const InstructorSection = () => {
  return (
    <div className="w-full  bg-richblack-900  ">
      <div className="w-full lg:max-w-[1440px] mx-auto min-h-screen px-4 lg:px-[120px] py-24 flex flex-col-reverse items-center lg:flex-row gap-12 lg:gap-24 ">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <img src={Instructor} />
        </div>
        <div className="">
          <div className=" font-semibold text-3xl lg:text-4xl  text-richblack-5">
            Become an <br />
            <HighlightText text="Instructor" />
          </div>
          <p className="text-richblack-300 mb-12">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>
          <CTAButton
            text="Start Teaching Today"
            className="py-3 px-6 rounded-lg bg-yellow-50 font-medium text-base text-richblack-900"
          />
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
