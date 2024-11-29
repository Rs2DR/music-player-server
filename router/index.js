const Router = require('express');
const UserController = require('../controllers/user-controller');
const router = new Router();
const registrationValidator = require('../validators/registration-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const TrackController = require('../controllers/traks-controller');

router.post(
	'/registration',
	registrationValidator,
	UserController.registration
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/checkAuth', UserController.checkAuth);
router.post('/addTrack', UserController.addTrack);
router.post('/deleteTrack', UserController.deleteTrack);
router.get('/getTopTracks', TrackController.getTopTracks);
router.post('/incrementView', TrackController.incrementView);
router.get('/getAllFavoritesTracks', UserController.getAllFavoritesTracks);
router.get('/getTrackById/:id', TrackController.getTrackById);

module.exports = router;
