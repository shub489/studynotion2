import React from "react";
import PromiseCard from "./PromiseCard";
import TimelineImage from "../../../assets/Images/TimelineImage.png";
import { FaIdBadge } from "react-icons/fa";
import { RiGraduationCapFill } from "react-icons/ri";
import { IoDiamondOutline } from "react-icons/io5";
import { FaCode } from "react-icons/fa";

const TimelineSection = () => {
  const timeline = [
    {
      id: 1,
      name: "Leadership",
      description: "Fully committed to the success company",
      icon: FaIdBadge,
      iconColor: "blue-200",
    },
    {
      id: 2,
      name: "Responsibility",
      description: "Students will always be our top priority",
      icon: RiGraduationCapFill,
      iconColor: "pink-200",
    },
    {
      id: 3,
      name: "Flexibility",
      description: "The ability to switch is an important skills",
      icon: IoDiamondOutline,
      iconColor: "caribbeangreen-200",
    },
    {
      id: 4,
      name: "Solve the problem",
      description: "Code your way to a solution",
      icon: FaCode,
      iconColor: "yellow-100",
    },
  ];
  return (
    <div className="w-full lg:max-w-[1200px] mx-auto px-4 lg:px-0 flex flex-col lg:flex-row  gap-20 mb-16 lg:mb-44">
      {/* remove padding pb-10 to mb-10 after part 3 is builded*/}
      {/* Left Div */}
      <div className="w-full lg:w-[34%] flex flex-col gap-8 justify-center items-start">
        {timeline.map((t, index) => (
          <PromiseCard
            name={t.name}
            description={t.description}
            Icon={t.icon}
            iconColor={t.iconColor}
            key={index}
          />
        ))}
      </div>
      {/* Right Div */}
      <div className="w-full lg:w-[60%]  h-[545px] overflow-hidden ">
        <img
          src={TimelineImage}
          alt="..."
          className="w-[714px] h-[545px] object-cover mx-auto"
        />
      </div>
    </div>
  );
};

export default TimelineSection;
