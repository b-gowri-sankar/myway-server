const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB Connected...");
	} catch (err) {
		console.error(err.message);
		//Exit Process With Failure
		process.exit(1);
	}
};

app.use(
	express.json({
		extended: false,
	})
);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blog", require("./routes/postRoutes"));

connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
