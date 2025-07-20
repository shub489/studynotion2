import React, { useState } from "react";
import HighlightText from "./HighlightText";
import LearnCard from "./LearnCard";
import CTAButton from "./CTAButton";
const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];
const HomePageExplore = [
  {
    tag: "Free",
    courses: [
      {
        heading: "Learn HTML",
        description:
          "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.",
        level: "Beginner",
        lessionNumber: 6,
      },
      {
        heading: "Learn CSS",
        description:
          "This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques",
        level: "Beginner",
        lessionNumber: 6,
      },
      {
        heading: "Responsive Web design",
        description:
          "This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes",
        level: "Beginner",
        lessionNumber: 6,
      },
    ],
  },
  {
    tag: "New to coding",
    courses: [
      {
        heading: "HTML",
        description:
          "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.",
        level: "Beginner",
        lessionNumber: 6,
      },
      {
        heading: "CSS",
        description:
          "This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques",
        level: "Beginner",
        lessionNumber: 6,
      },
      {
        heading: "Responsive ",
        description:
          "This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes",
        level: "Beginner",
        lessionNumber: 6,
      },
    ],
  },
  {
    tag: "Most popular",
    courses: [
      {
        heading: "Java",
        description:
          "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.",
        level: "Beginner",
        lessionNumber: 6,
      },
      {
        heading: "Python",
        description:
          "This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques",
        level: "Beginner",
        lessionNumber: 6,
      },
      {
        heading: "SCSS",
        description:
          "This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes",
        level: "Beginner",
        lessionNumber: 6,
      },
    ],
  },
  {
    tag: "Skills paths",
    courses: [
      {
        heading: "Flask",
        description:
          "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.",
        level: "Beginner",
        lessionNumber: 6,
      },
      {
        heading: "Django",
        description:
          "This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques",
        level: "Beginner",
        lessionNumber: 6,
      },
      {
        heading: "Fast API",
        description:
          "This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes",
        level: "Beginner",
        lessionNumber: 6,
      },
    ],
  },
  {
    tag: "Career paths",
    courses: [
      {
        heading: "Next.js",
        description:
          "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.",
        level: "Beginner",
        lessionNumber: 6,
      },
      {
        heading: "Nuxt.js",
        description:
          "This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques",
        level: "Beginner",
        lessionNumber: 6,
      },
      {
        heading: "Sanity",
        description:
          "This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes",
        level: "Beginner",
        lessionNumber: 6,
      },
    ],
  },
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState("Free");
  const [currentCourses, setCurrentCourses] = useState(() => {
    const selectedTabCourses = HomePageExplore.find(
      (item) => item.tag === "Free"
    );
    return selectedTabCourses?.courses || [];
  });
  const [selectedCardIndex, setSelectedCardIndex] = useState(0); // initially first card selected

  function handleTabChange(selectedTag) {
    setCurrentTab(selectedTag);
    const selectedTabCourses = HomePageExplore.find(
      (item) => item.tag === selectedTag
    );
    setCurrentCourses(selectedTabCourses?.courses);
    setSelectedCardIndex(0); // reset selected card on tab change
  }

  return (
    <div className="w-full lg:max-w-[1200px] mx-auto flex flex-col">
      <div className="text-center mb-9 lg:mb-16">
        <div className=" font-semibold text-3xl lg:text-4xl  text-richblack-5">
          Unlock the <HighlightText text="Power of Code" />
        </div>
        <p className="font-medium text-richblack-300">
          Learn to Build Anything You Can Imagine
        </p>
      </div>

      <div
        className="w-full lg:w-fit mx-auto flex flex-nowrap overflow-x-auto  lg:gap-4
             font-medium text-richblack-300 mb-4 px-2 lg:px-6 py-2 rounded-lg lg:rounded-full bg-richblack-800"
      >
        {tabsName.map((tag, index) => {
          const isActive = tag === currentTab;
          return (
            <div
              key={index}
              onClick={() => handleTabChange(tag)}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap
          ${
            isActive
              ? "bg-richblack-900 text-richblack-5"
              : "text-richblack-300"
          }`}
            >
              {tag}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-9  lg:justify-evenly">
        {currentCourses.map((currentCourse, index) => (
          <LearnCard
            heading={currentCourse?.heading}
            description={currentCourse?.description}
            key={index}
            dark={selectedCardIndex === index} // dark if selected
            onClick={() => setSelectedCardIndex(index)} // update selected on click
          />
        ))}
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
    </div>
  );
};

export default ExploreMore;
