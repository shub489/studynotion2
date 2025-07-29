import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import ContactFormSection from "../components/core/about/ContactFormSection";

const data = [
  {
    name: "5K",
    description: "Active Students",
  },
  {
    name: "10+",
    description: "Mentors",
  },
  {
    name: "200+",
    description: "Courses",
  },
  {
    name: "50+",
    description: "Awards",
  },
];

const About = () => {
  return (
    <div className="w-full mb-16">
      {/* Section-1 */}
      <div className="w-full bg-richblack-800 mb-16 lg:mb-44 ">
        <div className="w-full lg:max-w-[1200px] px-4 lg:mx-auto ">
          <p className=" py-2 px-5 font-medium text-richblack-200 text-center flex justify-center mb-9">
            About
          </p>

          <div className="w-full lg:w-[913px] mx-auto lg:px-12 text-start lg:text-center mb-12 ">
            <h2 className="text-2xl lg:text-4xl text-richblack-5 font-semibold mb-4">
              Driving Innovation in Online Education for a{" "}
              <HighlightText text="Brighter Future" />
            </h2>
            <p className="text-richblack-300">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </div>
          <div className="  flex flex-col lg:flex-row gap-4  justify-between mb-12 lg:mb-24 ">
            <img src={aboutus1} className="" />
            <img src={aboutus2} />
            <img src={aboutus3} />
          </div>
          <p className="text-start lg:text-center text-xl lg:text-4xl font-semibold text-richblack-100 pb-4 ">
            We are passionate about revolutionizing the way we learn. Our
            innovative platform{" "}
            <HighlightText text="combines technology ,expertise," /> and
            community to create an{" "}
            <HighlightText text="unparalleled educational experience" />.
          </p>
        </div>
      </div>

      {/* Section-2 */}
      <div className="w-full bg-richblack-900 mb-6 lg:mb-20">
        <div className="max-w-[1200px]  mx-4 lg:mx-auto ">
          {/* Part-A */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap:24 mb-12 lg:mb-44">
            <div className="lg:w-[50%] flex flex-col gap-6">
              <p className=" text-4xl font-semibold">
                <HighlightText text="Our Founding Story" />
              </p>
              <p className="text-richblack-300">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-richblack-300">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            <div className="lg:p-8 lg:w-[50%]">
              <img src={FoundingStory} />
            </div>
          </div>

          {/* Part-B */}
          <div className="flex  flex-col lg:flex-row justify-between items-center gap-8 lg:gap-24">
            <div className="lg:w-[50%] flex flex-col gap-3 lg:gap-6">
              <p className=" text-4xl font-semibold">
                <HighlightText text="Our Vision" />
              </p>
              <p className="text-richblack-300">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div className="lg:w-[50%] flex flex-col gap-3 lg:gap-6">
              <p className=" text-4xl font-semibold">
                <HighlightText text="Our Mission" />
              </p>
              <p className="text-richblack-300">
                our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section-3 */}
      <div className="w-full bg-richblack-700 py-6 lg:py-20 mb-9">
        <div className="max-w-[1200px] mx-4 lg:mx-auto flex flex-col lg:flex-row justify-between px-16">
          {data.map((item, index) => (
            <div key={index} className=" flex items-center gap-4">
              <p className="font-bold text-3xl text-richblack-5">{item.name}</p>
              <p className="font-600 text-richblack-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Section-4 */}

      {/* Section-5 */}
      <ContactFormSection />
    </div>
  );
};

export default About;
