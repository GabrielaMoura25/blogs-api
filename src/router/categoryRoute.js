const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');

const route = Router();

route.get('/', categoriesController.findAllCategories);
route.post('/', categoriesController.create);

module.exports = route;