const express = require("express");
const { capturePayment, verifySignatue } = require("../controllers/Payments");
const { auth, isStudent } = require("../middlewares/auth");

const router = express.Router();
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature", verifySignatue);

module.exports = router;
