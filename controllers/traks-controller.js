const ApiError = require('../exceptions/api-errors');
const tracksService = require('../service/tracks-service');

class TrackController {
	async getTopTracks(_, res, next) {
		try {
			const topTracks = await tracksService.getTopTracks();
			return res.json(topTracks);
		} catch (error) {
			next(ApiError.BadRequest('Не удалось получить топ треки!'));
		}
	}

	async getTrackById(req, res, next) {
		try {
			const { trackId } = req.query;

			const track = await tracksService.getTrackById(trackId);
			return res.json(track);
		} catch (error) {
			next(ApiError.BadRequest('Не удалось трек!'));
		}
	}

	async incrementView(req, res, next) {
		try {
			const { trackId } = req.body;

			const updatedTrack = tracksService.incrementView(trackId);

			res.json(updatedTrack);
		} catch (error) {
			next(ApiError.BadRequest('Не удалось увеличить кол-во просмотров!'));
		}
	}
}

module.exports = new TrackController();
