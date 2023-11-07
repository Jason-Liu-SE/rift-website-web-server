const express = require("express");
const dotenv = require("dotenv");
const mapRouter = require("./routes/map");

dotenv.config();

const app = express();
const path = require("path");
const port = process.env.PORT || 4000;

app.use("/map", mapRouter);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
