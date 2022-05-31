let express = require('express');
const { signup,login,forgotPassword } = require('../controllers/authController');

let route = express.Router();

route.post('/signup',signup);
route.post('/login',login);
route.post('/forgotPassword',forgotPassword);

module.exports = route;
