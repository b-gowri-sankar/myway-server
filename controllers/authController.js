const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const BlogUser = require("../models/BlogUser");
const jwt = require("jsonwebtoken");

//@desc REGISTER USER
//POST /register

exports.signUp = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { fullName, email, phoneNumber, password } = req.body;
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(password, salt);
		const blogUser = await BlogUser.findOne({ email });
		if (blogUser) {
			return res.status(400).json({ error: "User already exists" });
		}
		const newUser = new BlogUser({
			fullName,
			email,
			phoneNumber,
			password: hashedPass,
		});

		const user = await newUser.save();
		return res.status(200).json(user);
	} catch (err) {
		console.error(err);
		return res.status(500).json(err);
	}
};

//@desc LOGIN USER
//POST /Login

exports.Login = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty) {
		return req.status(400).json({ errors: errors.array() });
	}
	const { email, password } = req.body;

	try {
		let user = await BlogUser.findOne({ email });

		if (!user) {
			return res
				.status(400)
				.json({ errors: [{ msg: "Email or Password is Incorrect" }] });
		}
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res
				.status(400)
				.json({ errors: [{ msg: " Email or Password is Incorrect" }] });
		}

		const payload = {
			user: {
				id: user.id,
			},
		};
		jwt.sign(
			payload,
			process.env.JSON_SECRET_KEY,
			{ expiresIn: 360000 },
			(err, token) => {
				if (err) throw err;
				return res.json({ token });
			}
		);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send("Internal Server Error ");
	}
};
