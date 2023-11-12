const express = require("express");
const dotenv = require("dotenv");

const path = require("path");
const galleryRouter = express.Router();

dotenv.config();

galleryRouter.get("/test", (req, res) => {
	res.send({ msg: "gallery router" });
});

module.exports = galleryRouter;
