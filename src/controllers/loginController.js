require('dotenv').config();

const loginService = require('../services/loginService');

const loginController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    const result = await loginService.login(email, password);
    if (!result) {
      return res
        .status(400)
        .json({ message: 'Invalid fields' });
    }
    return res.status(200).json({ token: result });
  },
};

module.exports = loginController;