const express = require("express");
const dotenv = require("dotenv");

const path = require("path");
const mapRouter = express.Router();

dotenv.config();

mapRouter.get("/viewer", (req, res) => {
	res.sendFile(path.join(__dirname, "../pannellum/pannellum.htm"));
});

module.exports = mapRouter;
