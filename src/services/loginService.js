const jwt = require('../middlewares/jwt');
const { User } = require('../models');

const loginService = {
    login: async (email, _password) => {
        const user = await User.findOne({ where: { email } });
        if (!user) return null;

        const { password: _, ...userWhithoutPass } = user.dataValues;
        return jwt.createToken(userWhithoutPass); 
    },
};

module.exports = loginService;