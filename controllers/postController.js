const BlogPost = require("../models/BlogPost");

exports.getAll = async (req, res) => {
	try {
		const data = await BlogPost.find({});
		return res.status(200).json({
			data,
		});
	} catch (error) {
		return res.status(500).json({
			error: error,
			message: "Internal Server Error",
		});
	}
};

exports.getPost = async (req, res) => {
	try {
		const post = await BlogPost.findById(req.params.id);
		if (!post) return res.status(404).json("Not Found");
		return res.status(200).json(post);
	} catch (err) {
		return res.status(500).json(err);
	}
};

exports.createPost = async (req, res) => {
	const newPost = await new BlogPost(req.body);
	try {
		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
	} catch (err) {
		return res.status(500).json(err);
	}
};

exports.updatePost = async (req, res) => {
	try {
		const post = await BlogPost.findById(req.body._id);
		if (!post) {
			return res.status(400).json({
				error: "Post Not Found",
			});
		}
		const updatePost = await BlogPost.findByIdAndUpdate(req.body._id, {
			$set: {
				imageLink: req.body.imageLink,
				content: req.body.content,
				title: req.body.title,
			},
		});
		return res.status(200).json(updatePost);
	} catch (err) {
		return res.status(500).json(err);
	}
};

exports.deletePost = async (req, res) => {
	try {
		const post = await BlogPost.findById(req.params.id);
		if (!post) {
			return res.status(400).json({
				error: "Post Not Found",
			});
		}
		await BlogPost.findByIdAndDelete(req.params.id);
		return res.status(200).json({
			message: "Delete Successfully",
		});
	} catch (err) {
		return res.status(500).json(err);
	}
};
