import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import bannerVideo from "../assets/Images/banner.mp4";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import LearnCard from "../components/core/HomePage/LearnCard";
import TimelineImage from "../assets/Images/TimelineImage.png";
import PromiseCard from "../components/core/HomePage/PromiseCard";
import Instructor from "../assets/Images/Instructor.png";

import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguage from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";

const Home = () => {
  return (
    <div className="w-full mt-8 lg:mt-16">
      {/* Section-1 */}
      <div className="w-full bg-richblack-900 mb-8 lg:mb-32">
        <div className="max-w-[1440px] mx-4 lg:mx-auto ">
          {/* Part-1 */}
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

            <div className="flex flex-col gap-4 text-center">
              <h1 className=" font-semibold text-3xl lg:text-4xl">
                Empower Your Future with <HighlightText text="Coding Skills" />
              </h1>
              <p className=" font-medium text-base text-left lg:text-center">
                With our online coding courses, you can learn at your own pace,
                from anywhere in the world, and get access to a wealth of
                resources, including hands-on projects, quizzes, and
                personalized feedback from instructors.{" "}
              </p>
            </div>

            <div className=" flex justify-between w-[308px] gap-6">
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

          {/* Part 2 */}
          <video
            className="mt-9 w-full lg:max-w-5xl lg:h-[515px] mb-32 mx-auto"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={bannerVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Part-3 */}
          <div className="    text-white ">
            {/* Part-1(Upper) */}
            <div className="w-full max-w-[1086px] mx-auto h-auto  flex flex-col lg:flex-row  lg:justify-between lg:items-center gap-6 lg:gap-[130px] mb-16 lg:mb-64 ">
              <div className=" lg:max-w-[486px] ">
                <h2 className=" font-semibold text-3xl lg:text-4xl mb-3 leading-[38px] lg:leading-[44px]">
                  Unlock your <HighlightText text="coding potentia" /> with our
                  online courses
                </h2>
                <p className=" font-medium mb-9 lg:mb-16">
                  Our courses are designed and taught by industry experts who
                  have years of experience in coding and are passionate about
                  sharing their knowledge with you.
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

            {/* Part-2(Lower) */}
            <div className="w-full max-w-[1086px] mx-auto h-auto  flex flex-col-reverse lg:flex-row  lg:justify-between lg:items-center gap-6 lg:gap-[130px] mb-16 lg:mb-64 ">
              <CodeBlocks />
              <div className=" lg:max-w-[486px] ">
                <h2 className=" font-semibold text-3xl lg:text-4xl mb-3 leading-[38px] lg:leading-[44px]">
                  Start <HighlightText text="coding in seconds" />
                </h2>
                <p className=" font-medium mb-9 lg:mb-16">
                  Our courses are designed and taught by industry experts who
                  have years of experience in coding and are passionate about
                  sharing their knowledge with you.
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

          {/* Part-4  Unlock the Power of Code */}
          {/* <div className="max-w-[358px] lg:max-w-[1200px] mx-auto flex flex-col">
            <div className="text-center mb-9 lg:mb-16">
              <div className=" font-semibold text-3xl lg:text-4xl  text-richblack-5">
                Unlock the <HighlightText text="Power of Code" />
              </div>
              <p className="font-medium text-richblack-300">
                Learn to Build Anything You Can Imagine
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-9  lg:justify-evenly">
              <LearnCard
                heading="Learn HTML"
                description="This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more."
              />
              <LearnCard
                heading="Learn CSS"
                description="This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques"
                dark={true}
              />
              <LearnCard
                heading="Responsive Web design"
                description="This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes"
                dark={true}
              />
            </div>
            <div className=" mx-auto flex gap-3 lg:gap-6  mt-14 lg:mt-16 ">
              <CTAButton
                text="Expore Full Catalog"
                className="  py-3 px-6 rounded-lg bg-yellow-50 font-medium text-base text-richblack-900 "
              />
              <CTAButton
                text="Learn More"
                className=" py-3 px-6 rounded-lg bg-richblack-800 font-medium text-base text-richblack-5"
              />
            </div>
          </div> */}
          <ExploreMore />
        </div>
      </div>

      {/* Section-2 */}
      <div className="w-full  bg-pure-greys-5 pt-8 lg:pt-16 pb-36">
        <div className=" max-w-[1440px] mx-auto ">
          {/* Part-1 */}
          <div className="w-full  lg:max-w-[1200px] px-4 lg:px-0 mx-auto mb-14">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-3 lg:gap-28">
              <div className="w-full lg:w-[50%] font-semibold text-3xl lg:text-4xl leading-[44px] ">
                Get the skills you need for a{" "}
                <HighlightText text="job that is in demand." />
              </div>
              <div className="w-full lg:w-[50%] flex flex-col justify-between  gap-9 lg:gap-12">
                <p className="font-medium text-richblack-700">
                  The modern StudyNotion is the dictates its own terms. Today,
                  to be a competitive specialist requires more than professional
                  skills.
                </p>
                <CTAButton
                  text="Learn More"
                  className="w-[147px] h-[48px] py-3 px-6 rounded-lg bg-yellow-50 font-medium text-base text-richblack-900"
                />
              </div>
            </div>
          </div>

          {/* Part-2 */}
          {/* remove padding pb-10 to mb-10 after part 3 is builded*/}
          <TimelineSection />

          <LearningLanguage />

          {/* Part 3 */}
        </div>
      </div>

      {/* Section-3 */}
      {/* <div className="w-full  bg-richblack-900  ">
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
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>
            <CTAButton
              text="Start Teaching Today"
              className="py-3 px-6 rounded-lg bg-yellow-50 font-medium text-base text-richblack-900"
            />
          </div>
        </div>
      </div> */}
      <InstructorSection />
    </div>
  );
};

export default Home;
