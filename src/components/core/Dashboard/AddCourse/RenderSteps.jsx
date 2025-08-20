import React from "react";
import { useSelector } from "react-redux";
import { MdDone } from "react-icons/md";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuiler/CourseBuilderForm";

const steps = [
  {
    id: 1,
    title: "Course Information",
  },
  {
    id: 2,
    title: "Course Builder",
  },
  {
    id: 3,
    title: "Publish",
  },
];

const RenderSteps = () => {
  const step = useSelector((store) => store.course.step);

  return (
    <div>
      {/* Steps */}
      <div className=" w-[665px] flex justify-between mb-8">
        {steps.map((currentStep) => {
          return (
            <div
              className={`flex flex-col gap-2 items-center  `}
              key={currentStep.id}
            >
              <div
                className={`w-[34px] h-[34px] rounded-full ${
                  currentStep.id <= step
                    ? "border-2 border-yellow-50"
                    : "border-2 border-richblack-700"
                } flex items-center justify-center`}
              >
                {}
                <span
                  className={`font-semibold text-lg  ${
                    currentStep.id <= step
                      ? "text-yellow-50"
                      : "text-richblack-300"
                  }`}
                >
                  {currentStep.id < step ? (
                    <MdDone className="" />
                  ) : (
                    currentStep.id
                  )}
                </span>
              </div>
              <div
                className={` text-sm ${
                  currentStep.id <= step
                    ? "text-richblack-5"
                    : "text-richblack-300"
                } `}
              >
                {" "}
                {currentStep.title}
              </div>
            </div>
          );
        })}
      </div>
      {/* Form */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {/* {step === 3 && <PublishCourse />} */}
    </div>
  );
};

export default RenderSteps;
