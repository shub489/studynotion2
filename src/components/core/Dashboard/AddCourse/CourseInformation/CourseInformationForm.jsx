import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
import LoadingSVG from "../../../../comman/LoadingSVG";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      // courseTitle: "Learn Python",
      // courseShortDesc: "A good course",
      // coursePrice: "499",
      // courseCategory: "",
      // courseTags: [],
      // courseImage: null,
      // courseBenefits: "",
      // courseRequirements: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const { course, editCourse } = useSelector((store) => store.course);
  const { token } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  // States for Tags
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  // State for file
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Requirements(Instructions)
  const [requirementInput, setRequirementInput] = useState("");
  const [requirementArray, setRequirementArray] = useState([]);

  // This handle tags for useFormReact and normal tag state
  const updateTags = (newTags) => {
    setTags(newTags);
    setValue("courseTags", newTags, { shouldValidate: true });
  };

  // This handle requirements for useFormReact and normal requirement state
  const updateRequirements = (newRequirements) => {
    setRequirementArray(newRequirements);
    setValue("courseRequirements", newRequirements, { shouldValidate: true });
  };

  // This handle pressing ENTER button to add a tag
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();

      if (tags.includes(inputValue.trim())) return; // prevent duplicate tags

      const newTags = [...tags, inputValue.trim()];
      updateTags(newTags);
      setInputValue("");
    }
  };

  const handleRequimentAdding = () => {
    if (requirementInput.trim()) {
      // e.preventDefault();

      if (requirementArray.includes(requirementInput.trim())) return;

      const newRequirementsArray = [
        ...requirementArray,
        requirementInput.trim(),
      ];

      updateRequirements(newRequirementsArray);
      setRequirementInput("");
    }
  };

  // This handle to remove a tag
  const removeTag = (indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    updateTags(newTags);
  };

  // This handle to remove a requirement
  const removeRequirement = (indexToRemove) => {
    const newRequirementsArray = requirementArray.filter(
      (_, index) => index !== indexToRemove
    );
    updateRequirements(newRequirementsArray);
  };

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);

  // Preview Image after upload
  // REVIEW: If edit the course
  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    // Create an object URL for the file
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Clean up the URL when the component unmounts or when file changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      JSON.stringify(currentValues.courseTags) !== JSON.stringify(course.tag) ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category ||
      JSON.stringify(currentValues.courseRequirements) !==
        JSON.stringify(course.instructions)
      // TODO: currentValues.courseImage === course.thumbnail
    ) {
      return true;
    } else {
      return false;
    }
  };

  const submitInformationForm = async (data) => {
    // If wanted to edit course which is already created
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        // TODO: as tag and courseTags is array
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", data.courseTags);
        }
        // if (
        //   JSON.stringify(currentValues.courseTags) !== JSON.stringify(course.tag)
        // ) {
        //   formData.append("tag", data.courseTags);
        // }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory !== course.category) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }

        setLoading(true);
        let result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          setStep(2);
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made");
      }
    }
    // If want to create a new course
    else {
      const formData = new FormData();
      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseShortDesc);
      formData.append("price", data.coursePrice);
      formData.append("whatYouWillLearn", data.courseBenefits);
      formData.append("category", data.courseCategory);
      // formData.append("instructions", JSON.stringify(data.courseRequirements));
      formData.append("instructions", JSON.stringify(data.courseRequirements));
      formData.append("tag", data.courseTags);
      formData.append("thumbnail", data.courseImage);
      formData.append("status", COURSE_STATUS.DRAFT);

      setLoading(true);
      let result = await addCourseDetails(formData, token);
      dispatch(setCourse(result));
      dispatch(setStep(2));
      setLoading(false);
    }
  };

  return (
    <div className=" text-richblack-5 max-w-[665px] p-6 border-2 border-richblack-700 rounded-lg">
      <form onSubmit={handleSubmit(submitInformationForm)}>
        <div className=" flex flex-col gap-6">
          {/* Course name */}
          <label>
            <p className=" text-sm text-richblack-5 text-start mb-[6px]">
              Course Title
              <span className="text-pink-300 text-[10px] align-super ml-0.5">
                *
              </span>
            </p>
            <input
              className="w-full  rounded-lg p-3 bg-richblack-700 text-richblack-5"
              type="text"
              placeholder="Enter Course Title"
              {...register("courseTitle", {
                required: "Course title is required",
                minLength: {
                  value: 3,
                  message: "Minimum length is 3",
                },
              })}
            />
            {errors.courseTitle && (
              <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                {errors.courseTitle.message}
              </p>
            )}
          </label>

          {/* Course Description */}
          <label>
            <p className=" text-sm text-richblack-5 text-start mb-[6px]">
              Course Short Description
              <span className="text-pink-300 text-[10px] align-super ml-0.5">
                *
              </span>
            </p>

            <textarea
              type="textarea"
              rows={5}
              className="w-full  rounded-lg p-3 bg-richblack-700 text-richblack-5"
              placeholder="Enter Description"
              {...register("courseShortDesc", {
                required: "Course Description is required",
                minLength: {
                  value: 3,
                  message: "Minimum length is 3",
                },
              })}
            />
            {errors.courseShortDesc && (
              <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                {errors.courseShortDesc.message}
              </p>
            )}
          </label>

          {/* Price */}
          <label>
            <p className=" text-sm text-richblack-5 text-start mb-[6px]">
              Price
              <span className="text-pink-300 text-[10px] align-super ml-0.5">
                *
              </span>
            </p>
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-300 text-sm">
                <FaRupeeSign />
              </span>
              <input
                // type="number"
                placeholder="Enter Price"
                className="w-full rounded-lg p-3 pl-8 bg-richblack-700 text-richblack-5"
                {...register("coursePrice", {
                  required: "Price is required",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Price must be at least 1 Rs",
                  },
                })}
              />
            </div>
            {errors.coursePrice && (
              <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                {errors.coursePrice.message}
              </p>
            )}
          </label>

          {/* Category */}
          <label>
            <p className=" text-sm text-richblack-5 text-start mb-[6px]">
              Category
              <span className="text-pink-300 text-[10px] align-super ml-0.5">
                *
              </span>
            </p>

            <select
              className="w-full rounded-lg p-3 pl-8 bg-richblack-700 text-richblack-5"
              defaultValue=""
              {...register("courseCategory", {
                required: "Please choose a category",
              })}
            >
              <option className="text-richblack-400 w-6/12" value="" disabled>
                Choose a category
              </option>
              {!loading &&
                courseCategories?.map((courseCategory, index) => (
                  <option
                    key={index}
                    value={courseCategory?._id}
                    className="text-richblack-5 bg-richblack-800"
                  >
                    {courseCategory?.name}
                  </option>
                ))}
            </select>
            {errors.courseCategory && (
              <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                {errors.courseCategory.message}
              </p>
            )}
          </label>

          {/* Tags */}
          {/* Tags input */}
          <label>
            <p className="text-sm text-richblack-5 text-start mb-[6px]">
              Course Tags
            </p>
            <input
              type="text"
              className="w-full rounded-lg p-3 bg-richblack-700 text-richblack-5"
              placeholder="Type a tag and press Enter"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            {/* Hidden input for tags field (for react-hook-form) */}
            <input
              type="hidden"
              {...register("courseTags", {
                required: "At least 1 tag is required",
              })}
            />
            {errors.courseTags && (
              <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                {errors.courseTags.message}
              </p>
            )}
          </label>

          {/* Show tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-richblack-600 text-richblack-5 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    className="text-pink-300 font-bold"
                    onClick={() => removeTag(index)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Thumbnail */}
          <p className=" text-sm text-richblack-5 text-start">
            Course Thumbnail
            <span className="text-pink-300 text-[10px] align-super ml-0.5">
              *
            </span>
          </p>

          <label>
            {previewUrl ? (
              <>
                <img src={previewUrl} />
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setValue("courseImage", null);
                  }}
                  className="text-richblack-5"
                >
                  Remove
                </button>
              </>
            ) : (
              <div className=" w-full rounded-lg border-2 border-richblack-600 border-dashed py-8 px-3 bg-richblack-700 flex flex-col gap-2 items-center">
                <label>
                  <div className="w-[46px] h-[46px] p-3 cursor-pointer rounded-full bg-richblack-800 flex justify-between items-center">
                    <FaCloudUploadAlt className=" text-yellow-50" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("courseImage", {
                      required: "Thumbnail is required",
                    })}
                    onChange={(e) => {
                      const selectedFile = e.target.files[0];
                      if (selectedFile) {
                        setFile(selectedFile);
                        setValue("courseImage", selectedFile); // for RHF
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
                {errors.courseImage && (
                  <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                    {errors.courseImage.message}
                  </p>
                )}
              </div>
            )}
          </label>

          {/* Benifits of the course */}
          <label>
            <p className=" text-sm text-richblack-5 text-start mb-[6px]">
              Benifits of course
              <span className="text-pink-300 text-[10px] align-super ml-0.5">
                *
              </span>
            </p>
            <textarea
              placeholder="Benifits of course"
              rows={4}
              className="w-full p-3 rounded-lg text-richblack-5 bg-richblack-700 "
              {...register("courseBenefits", {
                required: "Please mention benifits of course",
              })}
            />
            {errors.courseBenefits && (
              <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                {errors.courseBenefits.message}
              </p>
            )}
          </label>

          {/* Requirements */}
          <label>
            <p className="text-sm text-richblack-5 text-start mb-[6px]">
              Course Requirements
            </p>

            {/* requirementInput */}
            <input
              type="text"
              className="w-full rounded-lg p-3 bg-richblack-700 text-richblack-5"
              placeholder="Pls mention requirements"
              value={requirementInput}
              onChange={(e) => setRequirementInput(e.target.value)}
            />
            <button
              className="font-bold text-yellow-50 p-2"
              onClick={handleRequimentAdding}
              type="button"
            >
              Add
            </button>

            {/* Hidden input for tags field (for react-hook-form) */}
            <input
              type="hidden"
              {...register("courseRequirements", {
                required: "At least 1 requirement is required",
              })}
            />
            {errors.courseRequirements && (
              <p className="text-sm text-pink-300 mt-1 text-start font-bold">
                {errors.courseRequirements.message}
              </p>
            )}
          </label>

          {/* Show Requirements */}
          {requirementArray.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {requirementArray.map((requirement, index) => (
                <span
                  key={index}
                  className="bg-richblack-600 text-richblack-5 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {requirement}
                  <button
                    type="button"
                    className="text-pink-300 font-bold"
                    onClick={() => removeRequirement(index)}
                  >
                    Remove
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className=" flex gap-3 justify-end">
            {editCourse && (
              <button
                className="bg-richblack-25 px-2 rounded-md py-1 text-richblack-800"
                onClick={() => dispatch(setStep(2))}
              >
                {" "}
                Continue without saving
              </button>
            )}
            <button
              disabled={loading}
              className="w-28 h-8 bg-yellow-50 px-2 rounded-md py-1 text-richblack-800 flex justify-center items-center"
            >
              {" "}
              {loading ? <LoadingSVG /> : !editCourse ? "Next" : "Save Changes"}
            </button>
          </div>

          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformationForm;
