const { model, Schema } = require('mongoose');

const TokenSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	refreshTokens: {
		type: Array,
		required: true,
	},
});

module.exports = model('Token', TokenSchema);
