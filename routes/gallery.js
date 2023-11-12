const express = require("express");
const dotenv = require("dotenv");
const galleryRouter = express.Router();

dotenv.config();

galleryRouter.get("/get", (req, res) => {
	res.send("Getting...");
});

galleryRouter.post("/set", (req, res) => {
	res.send("Setting...");
});

module.exports = galleryRouter;
