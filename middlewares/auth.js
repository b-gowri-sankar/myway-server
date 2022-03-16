const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
	//Get Token  from header

	const token = req.header("x-auth-token");

	//check if no token

	if (!token) {
		return res.status(401).json({ message: "No token, Authorization denied" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);
		// console.log(decoded);
		// console.log(decoded.user.accountUser === "Admin");
		if (decoded.user.accountUser === "Admin") {
			return next();
		}
		return res.status(401).json({ message: "Unauthorization" });
	} catch (err) {
		res.status(401).json({ mesage: "Token is not valid" });
	}
};
