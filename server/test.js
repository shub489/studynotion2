[
  {
    id1: 1,
    name: "Shub",
    hobbies: ["cricket", "football", "swimming"],
  },
  {
    id1: 2,
    name: "Rahul",
    hobbies: ["coding", "chess"],
  },
];

db.bankData.insertMany([
  {
    _id: 1,
    bank: [
      { city: "A", sec: 1, bank: "sbi" },
      { city: "A", sec: 2, bank: "sbi" },
      { city: "A", bank: "sbi" },
      { city: "A", sec: 3, bank: "pnb" },
      { city: "A", sec: 4, bank: "axis" },
    ],
  },
  {
    _id: 2,
    bank: [
      { city: "B", sec: 1, bank: "sbi" },
      { city: "B", sec: 2, bank: "sbi" },
      { city: "B", sec: 3, bank: "pnb" },
      { city: "B", sec: 4, bank: "axis" },
    ],
  },
]);

db.bankData.drop();

db.bankData.updateOne(
  { _id: 1 },
  {
    $pull: { bank: {  }, 
  }
);
-> excatly { city: "A", bank: "sbi" }, should be deleted and { city: "A", sec: 1, bank: "sbi" },
      { city: "A", sec: 2, bank: "sbi" }, should not be removed
