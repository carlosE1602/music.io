const express = require('express');
const routes = express.Router();
const UserController = require ('./controllers/UserController');
const LoginController = require('./controllers/LoginController');

//USERS
routes.post('/users', UserController.create);
routes.get('/users', UserController.list);
routes.delete('/users', UserController.delete);


//LOGIN
routes.post('/login', LoginController.login);

module.exports = routes;