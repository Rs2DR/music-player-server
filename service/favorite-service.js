const FavoritesModel = require('../models/favorite-model.js');

class FavoriteService {
	async addTrack(userId, trackId) {
		trackId = trackId.toString();

		await FavoritesModel.findByIdAndUpdate(
			userId,
			{
				$addToSet: { favorites: trackId },
			},
			{ upsert: true, new: true }
		);
	}

	async deleteTrack(userId, trackId) {
		const user = await FavoritesModel.findById(userId);
		if (!user) {
			throw new Error('Пользователь не найден');
		}

		user.favorites = user.favorites.filter(id => id !== trackId);
		await user.save();
	}

	async getAllFavoritesTracks(userId) {
		const user = await FavoritesModel.findById(userId);

		if (user) {
			return user.favorites;
		}
		return [];
	}
}

module.exports = new FavoriteService();
