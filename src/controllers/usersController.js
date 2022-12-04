const usersService = require('../services/usersService');
const validateUser = require('../middlewares/validateUser');
const jwt = require('../middlewares/jwt');

const usersController = {
  create: async (req, res) => {
    try {
      const validate = validateUser(req.body);
      if (validate.error) return res.status(validate.error.code).json(validate.error.message);

      const token = await usersService.create(req.body);
      if (token.error) return res.status(token.error.code).json(token.error.message);

      return res.status(201).json({ token });
    } catch (error) {
      return res.status(404).json({ message: 'Error', error: error.message });
    }
  },

  findAll: async (req, res) => {
    const token = req.headers.authorization;
    const validate = jwt.verifyToken(token);
    if (validate.error) return res.status(validate.error.code).json(validate.error.message);
    const result = await usersService.findAll();
    return res.status(200).json(result);
  },

  findByPk: async (req, res) => {
    const token = req.headers.authorization;
    const validate = jwt.verifyToken(token);
    if (validate.error) return res.status(validate.error.code).json(validate.error.message);
    const { id } = req.params;
    const result = await usersService.findByPk(id);
    if (result.error) return res.status(result.error.code).json(result.error.message);
    return res.status(200).json(result);
  },

  delete: async (req, res) => {
    const token = req.headers.authorization;
    const validate = jwt.verifyToken(token);
    if (validate.error) return res.status(validate.error.code).json(validate.error.message);

    const { email } = validate;
    const deleteUser = await usersService.destroy(email);
    if (deleteUser.error) {
      return res.status(deleteUser.error.code).json(deleteUser.error.message);
    }
    return res.status(204).end();
  },
};

module.exports = usersController;