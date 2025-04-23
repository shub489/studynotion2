const express = require("express");
const { connect } = require("./config/database.js");
const { sendOTP, signUp, login } = require("./controllers/Auth.js");
const {
  resetPasswordToken,
  resetPassword,
} = require("./controllers/ResetPassword.js");
const app = express();
require("dotenv").config();

app.use(express.json());
const PORT = process.env.PORT || 8000;
connect();

app.get("/", (req, res) => {
  res.send("Route working");
});
app.post("/sendotp", sendOTP);
app.post("/signup", signUp);
app.post("/login", login);
app.post("/resetpasswordtoken", resetPasswordToken);
app.post("/resetpassword", resetPassword);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
