let express = require('express');
const { signup,login } = require('../controllers/authController');

let route = express.Router();

route.post('/signup',signup);
route.post('/login',login);

module.exports = route;
