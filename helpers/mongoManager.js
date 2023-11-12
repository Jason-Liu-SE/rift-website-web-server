const mongoose = require("mongoose");
const dotenv = require("dotenv");
const gallerySchema = require("../models/gallery-schema.js");
const newsSchema = require("../models/news-schema.js");
const downloadsSchema = require("../models/downloads-schema.js");

dotenv.config();

exports.connect = () => {
	try {
		mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
		mongoose.pluralize(null);

		console.log("Connected to MongoDB");
	} catch (e) {
		console.error(e);
	}
};

exports.getGalleryCollection = async (collectionName) => {
	const model = gallerySchema.getModel(collectionName);
	let galleryCollection;

	await model
		.find({})
		.then(async (data) => {
			galleryCollection = data;
		})
		.catch((e) =>
			console.log(
				"ERROR: could not fetch gallery collection '" +
					collectionName +
					"': ",
				e
			)
		);

	return galleryCollection;
};

exports.getNewsItems = async () => {
	const model = newsSchema.model;
	let newsItems;

	await model
		.find({})
		.then(async (data) => {
			newsItems = data;
		})
		.catch((e) => console.log("ERROR: could not fetch news items: ", e));

	return newsItems;
};

exports.getDownloadCollection = async (collectionName) => {
	const model = downloadsSchema.getModel(collectionName);
	let downloadCollection;

	await model
		.find({})
		.then(async (data) => {
			downloadCollection = data;
		})
		.catch((e) =>
			console.log(
				"ERROR: could not fetch download collection '" +
					collectionName +
					"': ",
				e
			)
		);

	return downloadCollection;
};

exports.getAllDownloadCollections = async () => {
	const db = mongoose.connection.useDb("downloads");
	let collections = [];

	// getting a list of the collections
	// and formatting each collection with its
	// associated records
	try {
		await db.db
			.listCollections()
			.toArray()
			.then(async (data) => {
				for (let collection of data) {
					const items = await this.getDownloadCollection(
						collection.name
					);

					collections.push({
						name: collection.name,
						items: items,
					});
				}
			});
	} catch (e) {
		console.log("ERROR: could not fetch all of the download collections");
	}

	return collections;
};
