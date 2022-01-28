const express = require("express")
const AuthController = require('../controllers/AuthController');

const router = express.Router();
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/register', jsonParser, AuthController.createUser);
router.post('/login', jsonParser, AuthController.login);

module.exports = router