const { model, Schema } = require('mongoose');

const favoriteSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	favorites: {
		type: Array,
		required: true,
	},
});

module.exports = model('Favorite', favoriteSchema);
