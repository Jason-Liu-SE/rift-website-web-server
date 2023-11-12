const express = require("express");
const dotenv = require("dotenv");
const mongoManager = require("../helpers/mongoManager.js");

const galleryRouter = express.Router();

dotenv.config();

galleryRouter.get("/get-collection", async (req, res) => {
	const collectionName = req.query.collection ? req.query.collection : "";

	if (collectionName === "") {
		res.send({
			data: [],
			error: "ERROR: a collection name has not been passed with the endpoint call",
		});
	} else {
		const data = await mongoManager.getGalleryCollection(collectionName);
		res.send({ data: data });
	}
});

module.exports = galleryRouter;
