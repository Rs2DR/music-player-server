const ApiError = require('../exceptions/api-errors');
const favoriteService = require('../service/favorite-service');
const userService = require('../service/user-service');
const { validationResult } = require('express-validator');

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(
					ApiError.BadRequest('Ошибка при валидации', errors.array())
				);
			}
			const { name, email, password } = req.body;
			const userData = await userService.registration(name, email, password);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await userService.login(email, password);

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			await userService.logout(refreshToken);

			res.clearCookie('refreshToken');
			res.status(200).json({ message: 'Вы успешно вышли из аккаунта' });
		} catch (error) {
			next(error);
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link;
			await userService.activate(activationLink);
			return res.redirect(process.env.CLIENT_URL);
		} catch (error) {
			next(error);
		}
	}

	async checkAuth(req, res, next) {
		try {
			const { refreshToken } = req.cookies;

			const userData = await userService.refreshToken(refreshToken);

			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async addTrack(req, res, next) {
		try {
			const { userId, trackId } = req.body;
			if (!userId || !trackId) {
				return next(ApiError.BadRequest('userId и trackId обязательны'));
			}

			await favoriteService.addTrack(userId, trackId);

			return res.json({ message: 'Трек успешно добавлен' });
		} catch (error) {
			next(error);
		}
	}

	async deleteTrack(req, res, next) {
		try {
			const { userId, trackId } = req.body;
			if (!userId || !trackId) {
				return next(ApiError.BadRequest('userId и trackId обязательны'));
			}

			await favoriteService.deleteTrack(userId, trackId);

			return res.json({ message: 'Трек успешно удалён' });
		} catch (error) {
			next(error);
		}
	}

	async getAllFavoritesTracks(req, res, next) {
		try {
			const { userId } = req.query;

			if (!userId) {
				return next(ApiError.BadRequest('userId обязателен'));
			}

			const favoritesTracks = await favoriteService.getAllFavoritesTracks(
				userId
			);

			return res.json(favoritesTracks);
		} catch (error) {
			next(error);
		}
	}
}
module.exports = new UserController();
