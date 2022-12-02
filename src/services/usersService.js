const { User } = require('../models');
const jwt = require('../middlewares/jwt');

const usersService = {
  create: async (body) => {
    const user = await User.findOne({ where: { email: body.email } });
    if (user) return { error: { code: 409, message: { message: 'User already registered' } } };
    await User.create(body);
    const { password: _, ...userWhithoutPass } = body;
    return jwt.createToken(userWhithoutPass);
  },

  findAll: async () => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return users;
  },

  findByPk: async (id) => {
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!user) return { error: { code: 404, message: { message: 'User does not exist' } } };
    return user;
  },
};

module.exports = usersService;