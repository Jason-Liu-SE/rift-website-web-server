const express = require("express");
const dotenv = require("dotenv");

const path = require("path");
const downloadsRouter = express.Router();

dotenv.config();

downloadsRouter.get("/test", (req, res) => {
	res.send({ msg: "downloads router" });
});

module.exports = downloadsRouter;
