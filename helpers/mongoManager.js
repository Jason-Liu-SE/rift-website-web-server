const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

exports.connect = () => {
	try {
		mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

		console.log("Connected to MongoDB");
	} catch (e) {
		console.error(e);
	}
};
