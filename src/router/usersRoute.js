const { Router } = require('express');
const usersController = require('../controllers/usersController');

const route = Router();

route.get('/:id', usersController.findById);
route.get('/', usersController.findAllUsers);
route.post('/', usersController.create);

module.exports = route;