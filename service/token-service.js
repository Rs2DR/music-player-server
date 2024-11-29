const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
			expiresIn: '15s',
		});

		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
			expiresIn: '30d',
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
			return userData;
		} catch (error) {
			return null;
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
			return userData;
		} catch (error) {
			return null;
		}
	}

	async saveToken(userId, refreshToken) {
		const tokenData = await tokenModel.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshTokens = [...tokenData.refreshTokens, refreshToken];
			return tokenData.save();
		}

		const token = await tokenModel.create({
			user: userId,
			refreshTokens: [refreshToken],
		});
		return token;
	}

	async findToken(refreshToken) {
		const tokensFromDb = await tokenModel.findOne({
			refreshTokens: { $in: [refreshToken] },
		});
		return tokensFromDb;
	}
}

module.exports = new TokenService();
