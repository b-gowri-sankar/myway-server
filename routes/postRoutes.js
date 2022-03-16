const router = require("express").Router();
const {
	getAll,
	getPost,
	createPost,
	updatePost,
	deletePost,
} = require("../controllers/postController");
const authMiddleWare = require("../middlewares/auth");

router.get("/posts", getAll);
router.get("/post/:id", getPost);
router.post("/post/create", authMiddleWare, createPost);
router.put("/post/update", authMiddleWare, updatePost);
router.delete("/post/delete/:id", authMiddleWare, deletePost);

module.exports = router;
