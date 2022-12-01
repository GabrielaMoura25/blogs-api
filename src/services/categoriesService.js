const { Category } = require('../models');

const categoriesService = {
  create: async (body) => {
    const category = await Category.create(body);
    const dataValues = category.toJSON();
    return dataValues;
  },
  
  findAllCategories: async () => {
    const categories = await Category.findAll({ attributes: { exclude: ['password'] } });
    return categories;
  },

};

module.exports = categoriesService;