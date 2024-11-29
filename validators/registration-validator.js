const { body } = require('express-validator');

const registrationValidator = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быть минимум пять символов').isLength({
		min: 5,
		max: 32,
	}),
];

module.exports = registrationValidator;
