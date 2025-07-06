const { Op } = require('sequelize');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Obtener usuario autenticado
exports.getMe = (req, res) => {
  if (!req.user) return res.status(401).json({ mensaje: 'No autenticado' });
  const { contraseña, ...userData } = req.user.toJSON();
  res.json(userData);
};

// Buscar usuarios avanzado
exports.buscarUsuarios = async (req, res) => {
  const q = req.query.q;
  let where = {};
  if (q) {
    where[Op.or] = [
      { nombre_completo: { [Op.like]: `%${q}%` } },
      { descripcion: { [Op.like]: `%${q}%` } },
      { especialidades: { [Op.like]: `%${q}%` } },
      { ciudad: { [Op.like]: `%${q}%` } },
      { redes_sociales: { [Op.like]: `%${q}%` } },
      { certificaciones: { [Op.like]: `%${q}%` } }
    ];
  }
  const usuarios = await User.findAll({ where });
  res.json(usuarios.map(u => {
    const { contraseña, ...userData } = u.toJSON();
    return userData;
  }));
};

// Listar usuarios
exports.obtenerUsuarios = async (req, res) => {
  const where = {};
  if (req.query.rol) where.rol = req.query.rol;
  if (req.query.destacados) where.destacado = req.query.destacados === 'true' || req.query.destacados === '1';
  const usuarios = await User.findAll({ where });
  res.json(usuarios.map(u => {
    const { contraseña, ...userData } = u.toJSON();
    return userData;
  }));
};

// Obtener usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  const { contraseña, ...userData } = user.toJSON();
  res.json(userData);
};

// Crear usuario
exports.crearUsuario = async (req, res) => {
  res.json({ mensaje: 'Usuario creado (implementa la lógica)' });
};

// Actualizar usuario (solo campos permitidos y solo dueño o admin)
exports.actualizarUsuario = async (req, res) => {
  const camposPermitidos = [
    'nombre_completo', 'telefono', 'direccion', 'ciudad', 'pais', 'foto_perfil',
    'descripcion', 'especialidades', 'portafolio', 'redes_sociales', 'disponibilidad',
    'metodos_pago_aceptados', 'ubicacion_precisa', 'certificaciones', 'experiencia_anios', 'favoritos', 'genero', 'fecha_nacimiento'
  ];
  if (req.user.rol !== 'admin' && req.user.id !== parseInt(req.params.id)) {
    return res.status(403).json({ mensaje: 'No autorizado' });
  }
  const data = {};
  for (const campo of camposPermitidos) {
    if (req.body[campo] !== undefined) data[campo] = req.body[campo];
  }
  await User.update(data, { where: { id: req.params.id } });
  const user = await User.findByPk(req.params.id);
  const { contraseña, ...userData } = user.toJSON();
  res.json(userData);
};

// Eliminar usuario (solo admin)
exports.eliminarUsuario = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  await user.destroy();
  res.json({ mensaje: 'Usuario eliminado' });
};

// Login de usuario
exports.login = async (req, res) => {
  const { correo, contraseña } = req.body;
  const user = await User.findOne({ where: { correo } });
  if (!user) return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  const match = await bcrypt.compare(contraseña, user.contraseña);
  if (!match) return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '7d' });
  const { contraseña: _, ...userData } = user.toJSON();
  res.json({ token, user: userData });
};

exports.crearUsuario = async (req, res) => {
  res.json({ mensaje: 'Usuario creado (implementa la lógica)' });
};

exports.obtenerUsuarios = async (req, res) => {
  res.json([]);
};

exports.actualizarUsuario = async (req, res) => {
  res.json({ mensaje: 'Usuario actualizado (implementa la lógica)' });
};

exports.eliminarUsuario = async (req, res) => {
  res.json({ mensaje: 'Usuario eliminado (implementa la lógica)' });
};

exports.obtenerUsuarioPorId = async (req, res) => {
  res.json({});
};

exports.buscarUsuarios = async (req, res) => {
  res.json([]);
};

exports.getMe = (req, res) => {
  res.json(req.user);
};

exports.login = async (req, res) => {
  res.json({ token: 'fake-token', user: { id: 1, nombre_completo: 'Demo' } });
};