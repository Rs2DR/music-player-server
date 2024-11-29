const { Schema, model } = require('mongoose');

const TrackSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	trackLink: {
		type: String,
		required: true,
	},
	imgLink: {
		type: String,
		required: true,
	},
	views: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		require: true,
	},
});

module.exports = model('Track', TrackSchema);
