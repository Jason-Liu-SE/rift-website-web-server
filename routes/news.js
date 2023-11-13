const express = require("express");
const dotenv = require("dotenv");
const mongoManager = require("../helpers/mongoManager.js");

const newsRouter = express.Router();

dotenv.config();

newsRouter.get("/get-items", async (req, res) => {
	const startIndex = req.query.startIndex ? req.query.startIndex : 0;
	const limit = req.query.limit ? req.query.limit : -1;

	const data = await mongoManager.getNewsItems(startIndex, limit);
	res.send({ data: data });
});

newsRouter.get("/count-items", async (req, res) => {
	const data = await mongoManager.countNewsItems();
	res.send({ data: data });
});

module.exports = newsRouter;
