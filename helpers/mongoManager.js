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
		mongoose.set("autoCreate", false);

		console.log("Connected to MongoDB");
	} catch (e) {
		console.error(e);
	}
};

// limit = -1 implies that no limit was specified. Assumed all documents are desired
exports.getGalleryCollection = async (collectionName, startIndex, limit) => {
	const model = gallerySchema.getModel(collectionName);
	let galleryCollection;

	try {
		if (limit === -1) {
			await model.countDocuments({}).then(async (data) => (limit = data));
		}

		await model
			.find({})
			.skip(startIndex)
			.limit(limit)
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
	} catch (e) {
		console.log(e);
	}

	return galleryCollection;
};

exports.countGalleryCollectionItems = async (collectionName) => {
	const model = gallerySchema.getModel(collectionName);
	let galleryCollectionCount;

	try {
		await model
			.countDocuments({})
			.then(async (data) => {
				galleryCollectionCount = data;
			})
			.catch((e) =>
				console.log(
					"ERROR: could not fetch gallery collection '" +
						collectionName +
						"' count: ",
					e
				)
			);
	} catch (e) {
		console.log(e);
	}

	return galleryCollectionCount;
};

exports.getNewsItems = async () => {
	const model = newsSchema.model;
	let newsItems;

	try {
		await model
			.find({})
			.then(async (data) => {
				newsItems = data;
			})
			.catch((e) =>
				console.log("ERROR: could not fetch news items: ", e)
			);
	} catch (e) {
		console.log(e);
	}

	return newsItems;
};

exports.getDownloadCollection = async (collectionName) => {
	const model = downloadsSchema.getModel(collectionName);
	let downloadCollection;

	try {
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
	} catch (e) {
		console.log(e);
	}

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
		console.log(
			"ERROR: could not fetch all of the download collections",
			e
		);
	}

	return collections;
};
