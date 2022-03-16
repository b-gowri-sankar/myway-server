const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	imageLink: {
		type: String,
	},
	content: {
		type: String,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "BlogUser",
	},
	comments: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "BlogUser",
			},
			text: {
				type: String,
			},
		},
	],
	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "BlogUser",
			},
		},
	],
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);
