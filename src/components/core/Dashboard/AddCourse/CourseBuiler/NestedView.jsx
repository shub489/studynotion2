import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import ConfirmationModal from "../../../../comman/ConfirmationModal";
import { HiOutlinePlus } from "react-icons/hi";
import SubSectionModal from "./SubSectionModal";
import { deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";

const sectionData = [
  {
    title: "Video-1",
    timeDuration: null,
    description: "Description-1",
    videoUrl: null,
  },
  {
    title: "Video-2",
    timeDuration: null,
    description: "Description-2",
    videoUrl: null,
  },
  {
    title: "Video-3",
    timeDuration: null,
    description: "Description-3",
    videoUrl: null,
  },
];

const NestedView = ({
  handleChangeEditSectionName,
  handleChangeDeleteSection,
}) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [sectionToDelete, setSectionToDelete] = useState(null);

  //   const [ConfirmationModal, setConfirmationModal] = useState(null);

  // For confirmationModal Purpse Compment Purpose
  const [show, setShow] = useState(false);
  const modalRef = useRef(null);

  // For SubSection Modal
  const [showSubSectionModal, setShowSubSectionModal] = useState(false);
  const subSectionModalRef = useRef(null);

  // Delete SubSection
  async function handleDeleteSubSection(subSectionId, sectionId) {
    const result = await deleteSubSection({ subSectionId, sectionId }, token);
    dispatch(setCourse(result));
    // setShow(false);
  }

  useEffect(() => {}, [addSubSection, viewSubSection, editSubSection]);

  return (
    <div>
      <div className="max-w-[617px]  mx-auto rounded-lg border border-richblack-600 px-6">
        {course?.courseContent.map((section) => {
          return (
            <details key={section._id}>
              {/* <summary>{section.sectionName}</summary> */}
              <summary className=" border-b border-richblack-600 py-3 text-richblack-700 flex ">
                <div className=" w-9/12 flex items-center gap-2 cursor-pointer">
                  <RxDropdownMenu className=" w-5 h-5 text-richblack-50" />
                  <p className=" font-semibold text-richblack-50">
                    {section.sectionName}
                  </p>
                </div>
                <div className="w-3/12 flex items-center gap-2 text-richblack-400">
                  <button
                    onClick={() =>
                      handleChangeEditSectionName(
                        section._id,
                        section.sectionName
                      )
                    }
                  >
                    <MdEdit />
                  </button>

                  <button
                    // onClick={() => handleChangeDeleteSection(section._id)}
                    onClick={() => {
                      setShow(true);
                      setSectionToDelete(section._id);
                    }}
                  >
                    <MdDelete />
                  </button>
                  <FaCaretDown className=" cursor-pointer" />
                </div>
              </summary>

              {/* {sectionData.map((data, index) => { */}
              {section?.subSection?.map((data, index) => {
                return (
                  <div
                    key={index}
                    className=" py-3 pl-6 flex justify-between border-b border-richblack-600 cursor-pointer"
                    onClick={() => setViewSubSection(data)}
                  >
                    <div className=" flex gap-3 ">
                      <RxDropdownMenu className=" w-5 h-5 text-richblack-50" />
                      <p className=" font-semibold text-richblack-50">
                        {data.title}
                      </p>
                    </div>
                    <div className="text-richblack-400 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditSubSection({
                            ...data,
                            sectionId: section._id,
                          });
                        }}
                      >
                        <MdEdit className=" w-5 h-5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSubSection(data._id, section._id);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="py-3 flex gap-1 items-center text-yellow-50 font-medium">
                <HiOutlinePlus className="font-bold " />
                <button
                  onClick={() => {
                    setAddSubSection(section._id);
                  }}
                >
                  Add Lecture
                </button>
              </div>
            </details>
          );
        })}
      </div>
      {show && (
        <ConfirmationModal
          show={show}
          setShow={setShow}
          modalRef={modalRef}
          paragraph1={"Are you sure"}
          paragraph2={"This Section will be deleted"}
          button1={"Delete"}
          button1Handler={() => {
            handleChangeDeleteSection(sectionToDelete);
            setShow(false);
          }}
          button2={"cancel"}
          button2Handler={() => setShow(false)}
        />
      )}

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          subSectionModalRef={subSectionModalRef}
          add={true}
          setAddSubSection={setAddSubSection}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          subSectionModalRef={subSectionModalRef}
          edit={true}
          setEditSubSection={setEditSubSection}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          subSectionModalRef={subSectionModalRef}
          view={true}
          setViewSubSection={setViewSubSection}
        />
      ) : (
        <div> </div>
      )}
    </div>
  );
};

export default NestedView;
