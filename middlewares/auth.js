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
		if (decoded.user.accountUser === "Admin") {
			req.body.tokenUserId = decoded.user.id;
			return next();
		}
		return res.status(401).json({ message: "Unauthorization" });
	} catch (err) {
		return res.status(401).json({ mesage: "Token is not valid" });
	}
};
