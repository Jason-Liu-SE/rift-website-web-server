const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
	caption: { type: String, required: true },
	url: { type: String, required: true },
});

const db = mongoose.connection.useDb("gallery");

exports.SeasonOneModel = db.model("season-1", gallerySchema);
exports.SeasonTwoModel = db.model("season-2", gallerySchema);
exports.SeasonThreeModel = db.model("season-3", gallerySchema);
