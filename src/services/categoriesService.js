const { Category } = require('../models');

const categoriesService = {
  create: async (body) => {
    const category = await Category.create(body);
    const dataValues = category.toJSON();
    return dataValues;
  },       
};

module.exports = categoriesService;