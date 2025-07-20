import React from "react";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import HighlightText from "./HighlightText";
import CTAButton from "./CTAButton";

const LearningLanguageSection = () => {
  return (
    <div className="w-full  lg:max-w-[1100px] px-4 lg:px-0 mx-auto  ">
      <div className="w-full  lg:max-w-[760px] px-4 lg:px-0 mx-auto text-start lg:text-center mb-12">
        <h2 className="font-semibold text-3xl lg:text-4xl">
          {" "}
          Your swiss knife for <HighlightText text="learning any language" />
        </h2>
        <p className="font-medium">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row   mb-12 lg:mb-20 p-4 lg:p-0">
        <div className=" -mr-0 lg:-mr-20 -mb-10 lg:-mb-0">
          <img src={Know_your_progress} />
        </div>
        <div className="">
          <img src={Compare_with_others} />
        </div>
        <div className="-ml-0  lg:-ml-32 -mt-14 lg:-mt-0">
          <img src={Plan_your_lessons} />
        </div>
      </div>

      <div className="text-center">
        <CTAButton
          text="Learn More"
          className="  py-3 px-6 rounded-lg bg-yellow-50 font-medium text-base text-richblack-900"
        />
      </div>
    </div>
  );
};

export default LearningLanguageSection;
