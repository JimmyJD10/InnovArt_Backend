const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Token requerido' });
  }
  try {
    const token = auth.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};