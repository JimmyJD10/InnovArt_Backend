const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Token requerido' });
  }

  try {
    const token = auth.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
      }

      try {
        // Buscar el usuario completo en la base de datos
        const user = await User.findByPk(decoded.id);
        if (!user) {
          return res.status(401).json({ mensaje: 'Usuario no encontrado' });
        }

        req.user = user; // Ahora req.user es el objeto Sequelize completo
        next();
      } catch (dbError) {
        console.error('Error al buscar usuario:', dbError);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
    });
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};