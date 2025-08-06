import React from "react";
import thumbnail from "../../../../assets/Images/FoundingStory.png";
import Card from "./Card";

const courses = [
  {
    id: 1,
    thumbnail: thumbnail,
    courseName: "The Complete Python Bootcamp From Zero to Hero in Python",
    category: {
      name: "Name",
    },
    ratingAndReviews: {
      rating: 4.3,
      count: 4000,
    },
    price: 845,
  },
  {
    id: 2,
    thumbnail: thumbnail,
    courseName: "The Complete Python Bootcamp From Zero to Hero in Python",
    category: {
      name: "Name",
    },
    ratingAndReviews: {
      rating: 4.3,
      count: 4000,
    },
    price: 845,
  },
  {
    id: 3,
    thumbnail: thumbnail,
    courseName: "The Complete Python Bootcamp From Zero to Hero in Python",
    category: {
      name: "Name",
    },
    ratingAndReviews: {
      rating: 4.3,
      count: 4000,
    },
    price: 845,
  },
];

const RenderCartCourses = () => {
  // thumbnail courseName category.name 4.8 ratingAndReviews.length price
  return (
    <div className=" max-w-[794px] flex flex-col gap-16">
      {courses.map((course) => {
        return <Card key={course.id} {...course} />;
      })}
    </div>
  );
};

export default RenderCartCourses;
