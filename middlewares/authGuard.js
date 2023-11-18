const User = require('../models/User');
const jwj = require('jsonwebtoken');
const jwjSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // check if header has a token
  if (!token) {
    return res.status(401).json({errors: ['Acesso negado!']}).set('Access-Control-Allow-Origin', '*');
  }

  // Check if token is valid
  try {
    const verified = jwj.verify(token, jwjSecret);
    req.user = await User.findById(verified.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({errors: ['Token inválido']}).set('Access-Control-Allow-Origin', '*');
  }
};

module.exports = authGuard;
