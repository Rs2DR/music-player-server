const trackModel = require('../models/track-model');

class TrackService {
	async getTopTracks() {
		const topTracks = await trackModel.find({}).sort({ views: -1 }).limit(10);
		return topTracks;
	}

	async getTrackById(trackId) {
		const track = await trackModel.findById(trackId);
		return track;
	}

	async incrementView(trackId) {
		const track = await trackModel.findOneAndUpdate(
			{ _id: trackId },
			{ $inc: { views: 1 } },
			{ new: true }
		);
		return track;
	}
}

module.exports = new TrackService();
