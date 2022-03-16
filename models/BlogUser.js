const mongoose = require("mongoose");

const BlogUserSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		phoneNumber: {
			type: Number,
		},
		password: {
			type: String,
		},
		accountUser: {
			type: String,
			enum: ["Admin", "User"],
			default: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("BlogUser", BlogUserSchema);
