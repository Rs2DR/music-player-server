require('dotenv').config();
const nodemailer = require('nodemailer');

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});
	}

	async sendActivationMail(to, link) {
		try {
			await this.transporter.sendMail({
				from: `${process.env.SMTP_USER}>`,
				to,
				subject: `Активация аккаунта на ${process.env.API_URL}`,
				text: `Ссылка для активации: ${link}`,
				html: `<p>Для активации вашего аккаунта, пожалуйста, перейдите по следующей ссылке:</p><a href="${link}">${link}</a>`,
			});
			console.log(`Письмо активации отправлено на ${to}`);
		} catch (error) {
			console.error(`Не удалось отправить письмо активации: ${error.message}`);
		}
	}
}

module.exports = new MailService();
