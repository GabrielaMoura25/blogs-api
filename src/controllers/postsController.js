const postsService = require('../services/postsService');
const validatePost = require('../middlewares/validatePost');
const jwt = require('../middlewares/jwt');

const postsController = {
  create: async (req, res) => {
    const token = req.headers.authorization;
    const validateToken = jwt.verifyToken(token);

    if (validateToken.error) {
      return res.status(validateToken.error.code).json(validateToken.error.message);
    }

    const validateBody = validatePost(req.body);

    if (validateBody.error) {
      return res.status(validateBody.error.code).json(validateBody.error.message);
    }

    const { email } = validateToken;
    const result = await postsService.create(validateBody, email);

    if (result.error) return res.status(result.error.code).json(result.error.message);
    return res.status(201).json(result);
  },

  findAll: async (req, res) => {
    const token = req.headers.authorization;
    const validate = jwt.verifyToken(token);
    if (validate.error) return res.status(validate.error.code).json(validate.error.message);
    const result = await postsService.findAll();
    return res.status(200).json(result);
  },
};

module.exports = postsController;