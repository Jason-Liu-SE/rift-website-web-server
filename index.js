const express = require("express");
const mapRouter = require("./routes/map");

const app = express();
const path = require("path");
const port = 3000;

app.use("/map", mapRouter);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
