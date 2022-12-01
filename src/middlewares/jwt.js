require('dotenv').config();

const JWT = require('jsonwebtoken');

const jwt = {
    createToken: (data) => {
        const jwtConfig = { algorithm: 'HS256' };
        const token = JWT.sign(data, process.env.JWT_SECRET, jwtConfig);
        return token;
    },
};

module.exports = jwt;