import React from "react";
import RenderSteps from "./RenderSteps";

const AddCourse = () => {
  return (
    <div className="max-w-[1157px] pl-4 flex gap-6 items-start">
      <div>
        <div className="py-6 pl-6 text-sm text-richblack-300  mb-3">
          {" "}
          Back to Dashboard
        </div>

        <RenderSteps />
      </div>

      <div className="max-w-[384px] p-6 rounded-lg border-2 border-richblack-700 mt-6">
        <h2 className=" font-semibold text-lg text-richblack-5 mb-4">
          ⚡Course Upload Tips
        </h2>
        <ul className="list-disc text-xs font-medium text-richblack-5 flex flex-col gap-3 ">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>
            Add Topics in the Course Builder section to create lessons, quizzes,
            and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up on the course
            single page.
          </li>
          <li>Make Announcements to notify any important</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  );
};

export default AddCourse;
