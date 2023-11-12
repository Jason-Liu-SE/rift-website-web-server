const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const mapRouter = require("./routes/map");

dotenv.config();

const app = express();
const path = require("path");
const newsRouter = require("./routes/news");
const downloadsRouter = require("./routes/downloads");
const galleryRouter = require("./routes/gallery");
const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
	console.log("Connected to MongoDB");
});

app.use("/map", mapRouter);
app.use("/news", newsRouter);
app.use("/downloads", downloadsRouter);
app.use("/gallery", galleryRouter);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
