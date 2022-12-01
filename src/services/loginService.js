const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const loginService = {
    login: async (email) => {
        const user = await User.findOne({ where: { email } });
        if (!user) return null;

        return jwt.sign({ data: email }, JWT_SECRET); 
    },
};

module.exports = loginService;