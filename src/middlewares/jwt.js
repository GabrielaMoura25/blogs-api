require('dotenv').config();

const JWT = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwt = {
  createToken: (data) => {
    const jwtConfig = { algorithm: 'HS256', expiresIn: '15min' };
    const token = JWT.sign(data, secret, jwtConfig);
    return token;
  },
    
  verifyToken: (token) => {
    try {
      if (!token) return { error: { code: 401, message: { message: 'Token not found' } } };
      const validate = JWT.verify(token, secret);
      return validate;
    } catch (error) {
      return { error: { code: 401, message: { message: 'Expired or invalid token' } } };
    }
  },
};

module.exports = jwt;