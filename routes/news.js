const express = require("express");
const dotenv = require("dotenv");

const path = require("path");
const newsRouter = express.Router();

dotenv.config();

newsRouter.get("/test", (req, res) => {
	res.send({ msg: "news router" });
});

module.exports = newsRouter;
