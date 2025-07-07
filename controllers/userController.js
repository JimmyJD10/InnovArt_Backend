const { Op } = require('sequelize');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Obtener usuario autenticado
async function getMe(req, res) {
  if (!req.user) return res.status(401).json({ mensaje: 'No autenticado' });
  const { contraseña, ...userData } = req.user.toJSON();
  res.json(userData);
}

// Buscar usuarios avanzado
async function buscarUsuarios(req, res) {
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
}

// Listar usuarios
async function obtenerUsuarios(req, res) {
  const where = {};
  if (req.query.rol) where.rol = req.query.rol;
  if (req.query.destacados) where.destacado = req.query.destacados === 'true' || req.query.destacados === '1';

  const usuarios = await User.findAll({ where });
  res.json(usuarios.map(u => {
    const { contraseña, ...userData } = u.toJSON();
    return userData;
  }));
}

// Obtener usuario por ID
async function obtenerUsuarioPorId(req, res) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  const { contraseña, ...userData } = user.toJSON();
  res.json(userData);
}

// Crear usuario
async function crearUsuario(req, res) {
  try {
    const {
      nombre_completo, correo, contraseña, rol,
      telefono, genero, fecha_nacimiento, direccion, ciudad, pais,
      descripcion, especialidades, portafolio, redes_sociales,
      metodos_pago_aceptados, certificaciones, experiencia_anios, ubicacion_precisa
    } = req.body;

    const usuarioExistente = await User.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = await User.create({
      nombre_completo,
      correo,
      contraseña: hashedPassword,
      rol: rol || 'cliente',
      telefono, genero, fecha_nacimiento, direccion, ciudad, pais,
      descripcion, especialidades, portafolio, redes_sociales,
      metodos_pago_aceptados, certificaciones, experiencia_anios, ubicacion_precisa
    });

    const { contraseña: _, ...userData } = nuevoUsuario.toJSON();
    res.status(201).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el usuario' });
  }
}

// Actualizar usuario
async function actualizarUsuario(req, res) {
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
}

// Eliminar usuario
async function eliminarUsuario(req, res) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  await user.destroy();
  res.json({ mensaje: 'Usuario eliminado' });
}

// Login
async function login(req, res) {
  const { correo, contraseña } = req.body;
  const user = await User.findOne({ where: { correo } });
  if (!user) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

  const match = await bcrypt.compare(contraseña, user.contraseña);
  if (!match) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

  const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '7d' });
  const { contraseña: _, ...userData } = user.toJSON();
  res.json({
    token,
    user: {
      id: user.id,
      nombre_completo: user.nombre_completo,
      correo: user.correo,
      rol: user.rol,
      foto_perfil: user.foto_perfil,
      // Agrega más campos si lo necesitas
    }
  });
}

// Registro de usuario
exports.registrarUsuario = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ mensaje: errors.array()[0].msg });
  }
  crearUsuario(req, res);
};

// Login de usuario
exports.loginUsuario = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ mensaje: errors.array()[0].msg });
  }
  login(req, res);
};

// Exportación clara
module.exports = {
  getMe,
  buscarUsuarios,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  login,
  registrarUsuario,
  loginUsuario
};
