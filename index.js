const dotenv = require("dotenv");
const express = require("express");
const mapRouter = require("./routes/map");
const newsRouter = require("./routes/news");
const downloadsRouter = require("./routes/downloads");
const galleryRouter = require("./routes/gallery");
const mongoManger = require("./helpers/mongoManager.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

mongoManger.connect();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
	res.header("Access-Control-Allow-Methods", "GET,PUT,OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent"
	);
	if (req.method === "OPTIONS") {
		res.sendStatus(204);
	} else {
		next();
	}
});
app.use("/map", mapRouter);
app.use("/news", newsRouter);
app.use("/downloads", downloadsRouter);
app.use("/gallery", galleryRouter);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
