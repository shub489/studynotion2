import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import bannerVideo from "../assets/Images/banner.mp4";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";

const Home = () => {
  return (
    <div className="max-w-[1440px] min-h-screen mx-4 lg:mx-auto ">
      {/* Section 1 */}
      {/* Section 1-A */}
      <div
        className={` relative max-w-[913px] mx-auto  flex flex-col gap-9 items-center text-white justify-between `}
      >
        <Link to="/signup">
          <div
            className={`group mx-auto rounded-full border-2 border-blue-500 bg-richblack-800 text-richblack-200 transition-all duration-200 hover:scale-75   p-1`}
          >
            <div className="flex items-center gap-2 rounded-full py-2 px-4 group-hover:bg-richblack-900">
              <p>Become a Instructor</p>
              <FaArrowRightLong />
            </div>
          </div>
        </Link>

        {/* Section 1-B */}
        <div className="flex flex-col gap-4 text-center">
          <h1 className=" font-semibold text-[30px] lg:text-4xl">
            Empower Your Future with{" "}
            {/* <span className="bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
              Coding Skills
            </span> */}
            <HighlightText
              text="Coding Skills"
              // className="bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent"
            />
          </h1>
          <p className=" font-medium text-base text-left lg:text-center">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.{" "}
          </p>
        </div>

        <div className=" flex justify-between w-[308px] gap-6">
          {/* <button className="w-[135px] h-12 py-3 px-6 rounded-lg bg-yellow-50 font-medium text-base text-richblack-900">
            Learn More
          </button>
          <button className="w-[149px] h-12 py-3 px-6 rounded-lg bg-richblack-800 font-medium text-base text-richblack-5">
            Book a Demo
          </button> */}
          <CTAButton
            text="Learn More"
            className="w-[135px] h-12 py-3 px-6 rounded-lg bg-yellow-50 font-medium text-base text-richblack-900"
          />
          <CTAButton
            text="Book a Demo"
            className="w-[149px] h-12 py-3 px-6 rounded-lg bg-richblack-800 font-medium text-base text-richblack-5"
          />
        </div>
      </div>

      {/* Section 1-C */}
      <video
        className="mt-9 w-full lg:max-w-5xl lg:h-[515px] mb-32"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={bannerVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="    text-white ">
        {/* First */}
        <div className="w-full max-w-[1086px] mx-auto h-auto  flex flex-col lg:flex-row  lg:justify-between lg:items-center gap-6 lg:gap-[130px] mb-16 lg:mb-64 ">
          <div className="max-[358px] lg:max-w-[486px] ">
            <h2 className=" font-semibold text-[30px] lg:text-4xl mb-3 leading-[38px] lg:leading-[44px]">
              Unlock your <HighlightText text="coding potentia" /> with our
              online courses
            </h2>
            <p className=" font-medium mb-9 lg:mb-16">
              Our courses are designed and taught by industry experts who have
              years of experience in coding and are passionate about sharing
              their knowledge with you.
            </p>
            <div>
              <CTAButton
                text="Try it Yourself"
                className=" h-12 py-3 px-6 rounded-lg bg-yellow-50 font-medium text-base text-richblack-900 mr-6"
              />
              <CTAButton
                text="Learn More"
                className="w-[149px] h-12 py-3 px-6 rounded-lg bg-richblack-800 font-medium text-base text-richblack-5"
              />
            </div>
          </div>
          <CodeBlocks />
        </div>

        {/*  */}
        {/*  */}
        {/* Second */}
        {/*  */}
        {/*  */}
        {/* bg-gradient-to-r from-[#0E1A2D] to-[#111E32] */}
        <div className="w-full max-w-[1086px] mx-auto h-auto  flex flex-col-reverse lg:flex-row  lg:justify-between lg:items-center gap-6 lg:gap-[130px] mb-16 lg:mb-64 ">
          {/* <div className="w-full lg:w-[470px] h-[318px] lg:h-[278px] text-sm p-2 border-2  flex justify-between items-center gap-2 backdrop-blur-[52px] bg-gradient-to-r from-[#0E1A2D] to-[#111E32] ">
            <div className="w-[5%] p-1 font-bold text-richblack-400">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
              <p>10</p>
              <p>11</p>
            </div>
            <div class="w-[95%]  font-bold text-richblack-50">
              <p className="text-brown-100">&lt;!DOCTYPE html&gt;</p>
              <p>&lt;html&gt;</p>
              <p>&nbsp;&nbsp;&lt;head&gt;&lt;title&gt;Example&lt;/title&gt;</p>
              <p>
                &nbsp;&nbsp;&lt;link{" "}
                <span className="text-pink-300">
                  rel="stylesheet" href="styles.css"
                </span>
                &gt;
              </p>
              <p>&nbsp;&nbsp;&lt;/head&gt;</p>
              <p>&nbsp;&nbsp;&lt;body&gt;</p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;&lt;a
                href="/"&gt;Header&lt;/a&gt;&lt;/h1&gt;
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;nav&gt;&lt;a
                href="one/"&gt;One&lt;/a&gt;&lt;a
                href="two/"&gt;Two&lt;/a&gt;&lt;/nav&gt;
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;a href="three/"&gt;Three&lt;/a&gt;
              </p>
              <p>&nbsp;&nbsp;&lt;/body&gt;</p>
              <p>&lt;/html&gt;</p>
            </div>
          </div> */}
          <CodeBlocks />
          <div className="max-[358px] lg:max-w-[486px] ">
            <h2 className=" font-semibold text-[30px] lg:text-4xl mb-3 leading-[38px] lg:leading-[44px]">
              Start <HighlightText text="coding in seconds" />
            </h2>
            <p className=" font-medium mb-9 lg:mb-16">
              Our courses are designed and taught by industry experts who have
              years of experience in coding and are passionate about sharing
              their knowledge with you.
            </p>
            <div>
              <CTAButton
                text="Continue Lesson"
                className=" h-12 py-3 px-6 rounded-lg bg-yellow-50 font-medium text-base text-richblack-900 mr-6"
              />
              <CTAButton
                text="Learn More"
                className="w-[149px] h-12 py-3 px-6 rounded-lg bg-richblack-800 font-medium text-base text-richblack-5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}

      {/* Section 3 */}

      {/* Section 4 */}
    </div>
  );
};

export default Home;
