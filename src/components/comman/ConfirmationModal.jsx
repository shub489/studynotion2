import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";
import { IoMdClose } from "react-icons/io";

const ConfirmationModal = ({
  show,
  setShow,
  modalRef,
  paragraph1,
  paragraph2,
  button1,
  button1Handler,
  button2,
  button2Handler,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // UseEffect to add event listener to the document
  useEffect(() => {
    // Function to handle outside click
    const handleOutsideClick = (event) => {
      // Check if the click was outside the modal
      if (!modalRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    // Add the event listener to the document
    document.addEventListener("mousedown", handleOutsideClick);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      {/* Div for blur background */}
      <div className="fixed inset-0 backdrop-blur-sm z-10"></div>

      {/* Main modal */}
      <div
        ref={modalRef}
        className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20  w-[400px] rounded-lg bg-richblack-700 p-8 flex flex-col gap-4"
      >
        <div className=" text-4xl text-richblack-25">{paragraph1}</div>
        <div className=" text-lg text-richblack-100">{paragraph2}</div>
        <div className=" flex gap-8">
          <button
            className=" bg-yellow-50 px-4 py-1 font-semibold rounded-md text-lg"
            onClick={button1Handler}
          >
            {button1}
          </button>
          <button
            className=" bg-richblack-5 px-4 py-1 font-semibold rounded-md"
            onClick={button2Handler}
          >
            Cancel
          </button>
        </div>

        {/* Cross button */}
        <div
          className="absolute top-2 right-4 hover:scale-125 hover:cursor-pointer transition-all duration-200 text-richblack-5"
          onClick={() => setShow(!show)}
        >
          <IoMdClose className="w-[30px] h-[30px]" />
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
