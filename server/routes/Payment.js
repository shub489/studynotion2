const express = require("express");
const { capturePayment, verifySignatue } = require("../controllers/Payments");

const router = express.Router();
router.post("/capturePayment", capturePayment);
router.post("/verifySignature", verifySignatue);

module.exports = router;
