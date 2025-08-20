import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlusCircle } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  deleteSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
  const [editSection, setEditSection] = useState(false);
  const course = useSelector((state) => state.course.course);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [sectionTobeEditId, setSectionToBeEditId] = useState(null);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let result; // It's the updated course
    // If edit the section
    if (editSection) {
      data.courseId = course.courseId;
      // TODO: When click edit section, section Id has to be passed as well:
      data.sectionId = sectionTobeEditId;
      result = await updateSection(data, token);
    }

    // Creating a new section
    else {
      data.courseId = course._id;
      result = await createSection(data, token);
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSection(false);
      reset(); // reset input
      setValue("sectionNamew", "");
    }
    setLoading(false);
  };

  // Cancel Edit
  function cancelEdit() {
    setEditSection(false);
    setValue("sectionName", "");
  }

  // Goback
  function goBack() {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  // Go next step
  function goToNext() {
    if (course.courseContent.length === 0) {
      toast.error("Pls add atleast 1 section to continue");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Pls add atleast one video in each section");
      return;
    }

    dispatch(setStep(3));
  }

  //
  function handleChangeEditSectionName(sectionId, sectionName) {
    // setEditSection(sectionId);

    if (editSection === true) {
      cancelEdit();
      return;
    }
    setEditSection(true);
    setValue("sectionName", sectionName);
    setSectionToBeEditId(sectionId);
  }

  // Delete a Section
  async function handleChangeDeleteSection(sectionId) {
    let result = await deleteSection({ sectionId }, token);
    dispatch(setCourse(result));
  }

  return (
    <div>
      <div className=" max-w-[665px] bg-richblack-800 rounded-lg border-2 border-richblack-700 p-6 flex flex-col gap-6">
        <h1 className="text-richblack-5 font-semibold text-2xl">
          Course Builder
        </h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {/* <label htmlFor="section">Section</label> */}
          <input
            type="text"
            id="section"
            placeholder="Add a section to build your course"
            {...register("sectionName", {
              required: "Section Name is required",
            })}
            className=" rounded-lg p-3 font-medium text-richblack-5 bg-richblack-700"
          />
          {errors.sectionName && (
            <p className="text-pink-200  text-sm">
              {errors.sectionName.message}
            </p>
          )}
          {editSection ? (
            <>
              <div className="flex gap-2 items-end">
                <button
                  className="rounded-lg border-2 py-3 px-6 border-yellow-50 text-yellow-50 flex items-center gap-2 w-fit"
                  type="submit"
                >
                  <MdEdit />
                  <span>Edit Section</span>
                </button>
                <span
                  className=" text-sm underline text-richblack-5 cursor-pointer"
                  onClick={cancelEdit}
                >
                  Cancel Edit
                </span>
              </div>
            </>
          ) : (
            <button
              className="rounded-lg border-2 py-3 px-6 border-yellow-50 text-yellow-50 flex items-center gap-2 w-fit"
              type="submit"
            >
              <FiPlusCircle />
              <span>Create Section</span>
            </button>
          )}
        </form>
        {course && course.courseContent.length && (
          <NestedView
            handleChangeEditSectionName={handleChangeEditSectionName}
            handleChangeDeleteSection={handleChangeDeleteSection}
          />
        )}
        <div className=" flex gap-5 justify-end">
          <button
            className=" rounded-lg py-3 px-6 bg-richblack-800 text-richblack-5 border border-richblack-700 flex items-center gap-2"
            onClick={goBack}
          >
            <FaAngleLeft />
            <span>Back</span>
          </button>
          <button
            className=" rounded-lg py-3 px-6 bg-yellow-50 text-richblack-900 border border-richblack-700 flex items-center gap-2"
            onClick={goToNext}
          >
            <span>Next</span>
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
