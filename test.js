const { db } = require("./server/models/RatingAndReview");

db.course.insertMany([
  {
    course: "Full Stack Development By Love Babbar",
    studentEnrolled: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    course: "AI by Anjali Gupta",
    studentEnrolled: [4, 6, 8, 9],
  },
  {
    course: "Distrubuted System by Abhishek Gupta",
    studentEnrolled: [9, 5, 7, 3, 8, 1],
  },
]);

db.categories.insertMany([
  { name: "Web Development" },
  { name: "Data Science" },
  { name: "Mobile Development" },
]);

db.courses.insertMany([
  {
    name: "Python for Data Analysis",
    studentsEnrolled: [30, 40, 50, 60],
  },
  {
    name: "Machine Learning A-Z",
    studentsEnrolled: [1001, 1002, 1003, 1004, 1005, 1006, 110, 120, 130, 140],
  },
  {
    name: "Data Visualization with Tableau",
    studentsEnrolled: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
  {
    name: "Android Development with Kotlin",
    studentsEnrolled: [30, 40, 50, 60, 1004, 1005, 1006, 110],
  },
  {
    name: "iOS Development with Swift",
    studentsEnrolled: [1001, 1002, 1003, 40, 50, 60, 1004, 1005],
  },
  {
    name: "Flutter & Dart Complete Guide",
    studentsEnrolled: [
      50, 60, 70, 80, 1001, 1002, 1003, 1004, 1005, 1006, 110, 120, 130, 140,
      201, 202, 203, 204, 205,
    ],
  },
]);

// categories
// 68626007f6550630226c4bda -> web development
// 68626007f6550630226c4bdb -> data scienece
// 68626007f6550630226c4bdc -> mobile development

// courses
// Web Development 68626062f6550630226c4bdd 68626062f6550630226c4bde 68626062f6550630226c4bdf
// Data science 6862610ff6550630226c4be0 6862610ff6550630226c4be1 6862610ff6550630226c4be2
// Android 6862610ff6550630226c4be3 6862610ff6550630226c4be4 6862610ff6550630226c4be5

db.categories.aggregate([
  {
    $lookup: {
      from: "courses",
      localField: "courses",
      foreignField: "_id",
      as: "courseDetails",
    },
  },
  {
    $unwind: "$courseDetails",
  },
  {
    $addFields: { totalStudents: { $size: "$courseDetails.studentsEnrolled" } },
  },
  {
    $sort: { totalStudents: -1 },
  },
]);

db.categories.aggregate([
  { $match: { _id: ObjectId("68626007f6550630226c4bda") } },
  {
    $lookup: {
      from: "courses",
      localField: "courses",
      foreignField: "_id",
      as: "courseDetails",
    },
  },
  {
    $addFields: {
      courseDetails: {
        $map: {
          input: "$courseDetails",
          as: "course",
          in: {
            _id: "$$course._id",
            name: "$$course.name",
            studentsEnrolled: "$$course.studentsEnrolled",
            category: "$$course.category",
            totalStudents: { $size: "$$course.studentsEnrolled" },
          },
        },
      },
    },
  },
]);

db.courses.updateMany(
  {
    $or: [
      { _id: ObjectId("6862610ff6550630226c4be3") },
      { _id: ObjectId("6862610ff6550630226c4be4") },
      { _id: ObjectId("6862610ff6550630226c4be5") },
    ],
  },
  {
    $set: { category: ObjectId("68626007f6550630226c4bdc") },
  }
);

db.categories.updateOne(
  {
    _id: ObjectId("68626007f6550630226c4bdc"),
  },
  {
    $set: {
      courses: [
        ObjectId("6862610ff6550630226c4be3"),
        ObjectId("6862610ff6550630226c4be4"),
        ObjectId("6862610ff6550630226c4be5"),
      ],
    },
  }
);

// categories
// 68626007f6550630226c4bda -> web development
// 68626007f6550630226c4bdb -> data scienece
// 68626007f6550630226c4bdc -> mobile development

// courses
// Web Development 68626062f6550630226c4bdd 68626062f6550630226c4bde 68626062f6550630226c4bdf
// Data science 6862610ff6550630226c4be0 6862610ff6550630226c4be1 6862610ff6550630226c4be2
// Android 6862610ff6550630226c4be3 6862610ff6550630226c4be4 6862610ff6550630226c4be5

db.categories.aggregate([
  { $match: { _id: ObjectId("68626007f6550630226c4bdb") } },
  {
    $unwind: "$courses",
  },
]);

db.categories.aggregate([
  { $match: { _id: ObjectId("68626007f6550630226c4bdb") } },
  {
    $unwind: "$courses",
  },
  {
    $lookup: {
      from: "courses",
      localField: "courses",
      foreignField: "_id",
      as: "course",
    },
  },
  { $unwind: "$course" },
  {
    $project: { courses: 0 },
  },
  {
    $sort: { "course.totalStudents": -1 },
  },
]);
