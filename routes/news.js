const express = require("express");
const dotenv = require("dotenv");
const mongoManager = require("../helpers/mongoManager.js");

const newsRouter = express.Router();

dotenv.config();

newsRouter.get("/get-items", async (req, res) => {
	const data = await mongoManager.getNewsItems();
	res.send({ data: data });
});

module.exports = newsRouter;
