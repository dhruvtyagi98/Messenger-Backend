const express = require("express")
const AuthController = require('../controllers/AuthController');
const ContactController = require('../controllers/ContactController');
const UserController = require('../controllers/UserController');

const router = express.Router();
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/register', jsonParser, AuthController.createUser);
router.post('/login', jsonParser, AuthController.login);
router.post('/contacts', jsonParser, ContactController.createContact);
router.post('/user', jsonParser, UserController.getUser);

module.exports = router