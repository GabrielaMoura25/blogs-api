const usersService = require('../services/usersService');
const validateUser = require('../middlewares/validateUser');

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
};

module.exports = usersController;