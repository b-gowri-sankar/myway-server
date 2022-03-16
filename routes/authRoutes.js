const router = require("express").Router();
const { signUp, Login } = require("../controllers/authController");
const { check } = require("express-validator");

//@desc REGISTER USER
//POST /register

router.post(
	"/register",

	check("fullName", "Enter Full Name").exists(),
	check("password", "Password is Required").exists(),
	check("phoneNumber", "Phone Number is required").exists(),
	check("email", "Enter Valid Email").isEmail(),

	signUp
);

//@desc LOGIN USER
//POST /Login

router.post(
	"/Login",
	check("password", "Password is Required").exists(),
	check("email", "Enter Valid Email").isEmail(),
	Login
);

module.exports = router;
