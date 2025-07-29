import React, { useEffect, useState } from "react";
import CTAButton from "../HomePage/CTAButton";
import { useForm } from "react-hook-form";

const ContactFormSection = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      firstname: "Shu",
      lastname: "Dev",
      email: "shu@example.com",
      phone: "1234567890",
      message: "Hi there!",
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  function submitContactForm(data) {
    setLoading(true);
    // 2 second wait ka promise
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    wait(2000).then(() => {
      console.log("apiCalled", data);
      setLoading(false);
    });
  }

  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto">
        <div className=" mx-full lg:max-w-[600px] mx-auto">
          <div className="flex flex-col gap-3 text-center p-6 lg:p-8">
            <h2 className="font-semibold text-4xl text-richblack-5">
              Get in Touch
            </h2>
            <p className="text-richblack-300">
              We’d love to here for you, Please fill out this form.
            </p>

            <div className=" flex flex-col ">
              <form
                className=" flex flex-col gap-5"
                onSubmit={handleSubmit(submitContactForm)}
              >
                <div className=" flex flex-col lg:flex-row lg:justify-between">
                  <label>
                    <p className=" text-sm text-richblack-5 text-start mb-[6px]">
                      First Name
                    </p>
                    <input
                      className="w-full lg:w-[258px] rounded-lg p-3 bg-richblack-800 text-richblack-5"
                      placeholder="Enter First Name"
                      {...register("firstname", {
                        required: "First Name is required",
                        minLength: {
                          value: 3,
                          message: "Minimum length is 3",
                        },
                      })}
                    />
                    {errors.firstname && (
                      <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                        {errors.firstname.message}
                      </p>
                    )}
                  </label>
                  <label>
                    <p className=" text-sm text-richblack-5  text-start mb-[6px]">
                      Last Name
                    </p>
                    <input
                      className="w-full lg:w-[258px] rounded-lg p-3 bg-richblack-800 text-richblack-5"
                      placeholder="Enter Last Name"
                      {...register("lastname")}
                    />
                  </label>
                </div>
                <label className="">
                  <p className=" text-sm text-richblack-5  text-start mb-[6px]">
                    Email Address
                  </p>
                  <input
                    className="w-full rounded-lg p-3 bg-richblack-800 text-richblack-5"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                </label>
                {errors.email && (
                  <p className="text-sm text-pink-300 -mt-5 text-start font-bold">
                    {errors.email.message}
                  </p>
                )}
                <label>
                  <p className=" text-sm text-richblack-5  text-start mb-[6px]">
                    Phone Number
                  </p>
                  <input
                    className="w-full rounded-lg p-3 bg-richblack-800 text-richblack-5"
                    placeholder="Phone"
                    {...register("phone", {
                      required: "Phone no is required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Phone number must be exactly 10 digits",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                      {errors.phone.message}
                    </p>
                  )}
                </label>
                <label>
                  <p className=" text-sm text-richblack-5  text-start mb-[6px]">
                    Message
                  </p>
                  <textarea
                    type="textarea"
                    rows={5}
                    className="w-full rounded-lg p-3 bg-richblack-800 text-richblack-5"
                    placeholder="Message"
                    {...register("message", {
                      required: "Message is required",
                    })}
                  />
                  {errors.message && (
                    <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                      {errors.message.message}
                    </p>
                  )}
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 py-3 px-6 rounded-lg bg-yellow-50 font-medium text-base text-richblack-900"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;
