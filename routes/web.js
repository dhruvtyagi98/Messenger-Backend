const express = require("express")
const AuthController = require('../controllers/AuthController');
const ContactController = require('../controllers/ContactController');
const UserController = require('../controllers/UserController');
const GroupController = require('../controllers/GroupController');
const ChatController = require('../controllers/ChatController');
const checkToken = require('../middlewares/CheckTokenMiddleware');

const router = express.Router();
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/register', jsonParser, AuthController.createUser);
router.post('/login', jsonParser, AuthController.login);
router.post('/contacts', jsonParser, checkToken, ContactController.createContact);
router.post('/user', jsonParser, checkToken, UserController.getUser);
router.post('/group', jsonParser, checkToken, GroupController.createGroup);
router.post('/group/create', jsonParser, checkToken, GroupController.addToGroup);
router.post('/chat', jsonParser, checkToken, ChatController.createChat);
router.get('/chat', jsonParser, checkToken, ChatController.fetchAllChats);

module.exports = router