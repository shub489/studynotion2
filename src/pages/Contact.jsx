import React from "react";
import ContactFormSection from "../components/core/about/ContactFormSection";
import { CiChat1 } from "react-icons/ci";
import { FaGlobeAsia } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

const data = [
  {
    title: "Chat on us",
    description: "Our friendly team is here to help.",
    info: "shubham@gmail.com",
    icon: <CiChat1 />,
  },
  {
    title: "Visit us",
    description: "Our friendly team is here to help.",
    info: "Logix Cyber Park, Noida",
    icon: <FaGlobeAsia />,
  },
  {
    title: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    info: "+91-9899900000",
    icon: <FaPhoneAlt />,
  },
];

const Contact = () => {
  return (
    <div className="w-full lg:max-w-[1100px] flex flex-col-reverse lg:flex-row justify-evenly items-center mx-auto mt-9">
      <div className=" p-6 rounded-xl w-full lg:w-[450px] lg:bg-richblack-800 flex flex-col gap-6">
        {data.map((item, index) => {
          return (
            <div className="flex gap-2 p-3 items-start">
              <div className="w-6 h-6 text-richblack-100  mt-1">
                {item.icon}{" "}
              </div>
              <div className="flex flex-col gap-1 ">
                <p className="text-lg font-semibold text-richblack-5">
                  {item.title}
                </p>
                <p className="text-sm text-richblack-200">{item.description}</p>
                <p className="font-semibold text-sm text-richblack-200">
                  {item.info}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <ContactFormSection />
    </div>
  );
};

export default Contact;
