import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Home2 = () => {
  return (
    <div>
      {/* Section 1 */}
      <div
        className={` relative mx-auto w-11/12 flex flex-col gap-9 items-center text-white justify-between border-2 border-yellow-100 `}
      >
        <Link to="/signup">
          <div
            className={`group mx-auto rounded-full border-2 border-blue-500 bg-richblack-800 text-richblack-200 transition-all duration-200 hover:scale-75  mt-16 p-1`}
          >
            <div className="flex items-center gap-2 rounded-full py-2 px-4 group-hover:bg-richblack-900">
              <p>Become a Instructor</p>
              <FaArrowRightLong />
            </div>
          </div>
        </Link>

        <div className="flex flex-col gap-4">
          <h1 className="text-center font-semibold text-4xl">
            Empower Your Future with <spam>Coding Skills</spam>
          </h1>
          <p>
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.{" "}
          </p>
        </div>
      </div>

      {/* Section 2 */}

      {/* Section 3 */}

      {/* Section 4 */}
    </div>
  );
};

export default Home2;
