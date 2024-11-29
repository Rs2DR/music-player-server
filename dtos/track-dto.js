module.exports = class TrackDto {
	id;
	link;
	yaer;
	title;
	author;
	createdAt;

	constructor(model) {
		this.id = model._id;
		this.link = model.link;
		this.yaer = model.yaer;
		this.title = model.title;
		this.author = model.author;
		this.createdAt = model.createdAt;
	}
};
