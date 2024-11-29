require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);
app.use(errorMiddleware);
app.use('/music', express.static(path.join(__dirname, 'public/music')));

async function start() {
	try {
		await mongoose.connect(process.env.DB_URL);
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
	} catch (error) {
		console.error('Error starting server:', error);
	}
}

start();
