const express = require("express");
const dotenv = require("dotenv");

const path = require("path");
const mapRouter = express.Router();

dotenv.config();

mapRouter.use(express.static(path.join(__dirname, "../output map test")));

mapRouter.get("/test", (req, res) => {
	res.sendFile(path.join(__dirname, "../output map test/index.html"));
	console.log("test");
});

module.exports = mapRouter;
