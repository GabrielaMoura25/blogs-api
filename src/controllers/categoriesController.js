const categoriesService = require('../services/categoriesService');
const jwt = require('../middlewares/jwt');
const validateCategory = require('../middlewares/validateCategory');

const categoriesController = {
  create: async (req, res) => {
    const token = req.headers.authorization;
    const validateToken = jwt.verifyToken(token);

    if (validateToken.error) {
      return res.status(validateToken.error.code).json(validateToken.error.message);
    }

    const validateBody = validateCategory(req.body);

    if (validateBody.error) {
      return res.status(validateBody.error.code).json(validateBody.error.message);
    }

    const result = await categoriesService.create(validateBody);
    return res.status(201).json(result);
  },

  findAll: async (req, res) => {
    const token = req.headers.authorization;
    const validate = jwt.verifyToken(token);
    if (validate.error) return res.status(validate.error.code).json(validate.error.message);
    const result = await categoriesService.findAll();
    return res.status(200).json(result);
  },
};

module.exports = categoriesController;