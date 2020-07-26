var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth.controller');
var jwtMiddleware = require('../modules/jwtMiddleware');
var emailMiddleware = require('../modules/verifyEmailMiddleware');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/signup', emailMiddleware.isEmailExist ,authController.signup);

router.post('/login',authController.login);

router.get('/authenticate',jwtMiddleware.tokenVerification,authController.authenticate);

router.post('/refreshToken',jwtMiddleware.tokenVerification, authController.refreshToken);

module.exports = router;