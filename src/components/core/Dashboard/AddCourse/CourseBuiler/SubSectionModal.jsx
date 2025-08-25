import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import LoadingSVG from "../../../../comman/LoadingSVG";

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";

const SubSectionModal = ({
  modalData,
  setModalData,
  subSectionModalRef,
  add = false,
  view = false,
  edit = false,
  setAddSubSection,
  setEditSubSection,
  setViewSubSection,
}) => {
  //Form
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  // State for file
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Preview Image after upload
  // REVIEW: If edit the course
  useEffect(() => {
    if (!file) {
      if (modalData?.videoUrl) {
        setPreviewUrl(modalData?.videoUrl);
        return;
      }
      setPreviewUrl("");
      return;
    }

    // Create an object URL for the file
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Clean up the URL when the component unmounts or when file changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  // UseEffect to add event listener to the document
  useEffect(() => {
    // Function to handle outside click
    const handleOutsideClick = (event) => {
      // Check if the click was outside the modal
      if (!subSectionModalRef.current.contains(event.target)) {
        setModalData(null);
      }
    };

    // Add the event listener to the document
    document.addEventListener("mousedown", handleOutsideClick);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDescription", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  function CloseModal() {
    setModalData(null);
  }

  async function handleEditSubSection() {
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDescription !== modalData.description) {
      formData.append("description", currentValues.lectureDescription);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    // EDIT SUB-SECTION API CALL
    setLoading(true);

    const result = await updateSubSection(formData, token);

    if (result) {
      dispatch(setCourse(result));
    }
    setModalData(null);
    setLoading(true);
  }

  async function handleAddSubSection(data) {
    const formData = new FormData();
    const currentValues = getValues();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDescription);
    formData.append("video", data.lectureVideo);

    setLoading(true);
    // ADD SECTION API CALL
    const result = await createSubSection(formData, token);

    if (result) {
      dispatch(setCourse(result));
    }
    setModalData(null);
    setLoading(false);
  }

  function isFormUpdated() {
    const currentValues = getValues();

    // Checking if  Editing the Sub Section
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDescription !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true; // Sub Section is  getting edited
    } else {
      return false; // Sub Section is not getting edited
    }
  }

  function onSubmit(data) {
    if (view) {
      return;
    }

    if (edit) {
      console.log("isFormUpdated ", isFormUpdated());
      if (!isFormUpdated()) {
        toast.error("No changes made in the form.");
        return;
      }
      handleEditSubSection();
      return;
    }

    // else -> adding the sub section
    if (add) {
      handleAddSubSection(data);
    }
  }

  return (
    <div className="">
      {/* Div for blur background */}
      <div className="fixed inset-0 backdrop-blur-sm z-10"></div>

      {/* Main modal */}
      <div
        ref={subSectionModalRef}
        className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20  rounded-lg bg-richblack-700  flex flex-col gap-4 w-[665px]"
      >
        <div className="border border-b-richblack-600 py-4 px-6 text-richblack-700 flex justify-between">
          <p className=" font-semibold text-lg text-richblack-5">
            {add && "Adding Lecture"}
            {edit && "Editing Lecture"}
            {view && "Viewing Lecture"}
          </p>
          <IoIosClose
            className=" w-8 h-8  text-richblack-50 cursor-pointer"
            onClick={CloseModal}
          />
        </div>

        <div className="p-8 pb-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* VIDEO ADD */}
            {/* Thumbnail */}
            <p className=" text-sm text-richblack-5 text-start mb-2">
              Course Thumbnail
              <span className="text-pink-300 text-[10px] align-super ml-0.5">
                *
              </span>
            </p>

            <label>
              {previewUrl ? (
                <>
                  <video
                    src={previewUrl}
                    controls
                    className="w-full max-h-[300px] rounded-lg"
                  />
                  {!view && (
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setValue("lectureVideo", null);
                        setPreviewUrl("");
                      }}
                      className="text-richblack-5"
                    >
                      Remove
                    </button>
                  )}
                </>
              ) : (
                <div className=" w-full rounded-lg border-2 border-richblack-600 border-dashed py-8 px-3 bg-richblack-700 flex flex-col gap-2 items-center">
                  <label>
                    <div className="w-[46px] h-[46px] p-3 cursor-pointer rounded-full bg-richblack-800 flex justify-between items-center">
                      <FaCloudUploadAlt className=" text-yellow-50" />
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      {...register("lectureVideo", {
                        required: "Video is required",
                      })}
                      onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        if (selectedFile) {
                          setFile(selectedFile);
                          setValue("lectureVideo", selectedFile); // for RHF
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  <div className="w-60 text-sm ">
                    Drag and drop an image, or{" "}
                    <span className="font-semibold text-yellow-50">Browse</span>{" "}
                    Max 6MB each (12MB for videos)
                  </div>
                  <ul className="w-[383px]  flex justify-between p-[10px] list-disc ">
                    <li className="text-sm font-semibold text-richblack-400">
                      Aspect ratio 16:9
                    </li>
                    <li className="text-sm font-semibold text-richblack-400">
                      Recommended size 1024x576
                    </li>
                  </ul>
                  {errors.videoUrl && (
                    <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                      {errors.videoUrl.message}
                    </p>
                  )}
                </div>
              )}
            </label>

            {/* SubSection Name */}
            <label>
              <p className=" text-sm text-richblack-5 text-start mb-[6px]">
                Lecture Title
                <span className="text-pink-300 text-[10px] align-super ml-0.5">
                  *
                </span>
              </p>
              <input
                className="w-full  rounded-lg p-3 bg-richblack-600 text-richblack-5  "
                type="text"
                disabled={!edit && !add} // Don't allow for view
                placeholder="Enter Lecture Title"
                {...register("lectureTitle", {
                  required: "Lecture title is required",
                  minLength: {
                    value: 3,
                    message: "Minimum length is 3",
                  },
                })}
              />
              {errors.lectureTitle && (
                <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                  {errors.lectureTitle.message}
                </p>
              )}
            </label>

            {/* Lecture Description */}
            <label>
              <p className=" text-sm text-richblack-5 text-start mb-[6px]">
                Lecture Description
                <span className="text-pink-300 text-[10px] align-super ml-0.5">
                  *
                </span>
              </p>
              <textarea
                placeholder="Lecture Description"
                disabled={!edit && !add}
                rows={4}
                className="w-full p-3 rounded-lg bg-richblack-600 text-richblack-5 "
                {...register("lectureDescription", {
                  required: "Lecture descriprion is required",
                })}
              />
              {errors.lectureDescription && (
                <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                  {errors.lectureDescription.message}
                </p>
              )}
            </label>
            <div className=" p-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={CloseModal}
                className="rounded-lg px-6 py-3 border border-richblack-100 text-richblack-5 "
              >
                Cancel
              </button>
              {(edit || add) && (
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg px-6 py-3 border border-richblack-100 bg-yellow-50 text-richblack-900"
                >
                  {/* {loading ? "Save" : <LoadingSVG />} */}
                  {loading ? "Uploading..." : "Save"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubSectionModal;
