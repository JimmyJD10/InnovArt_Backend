const { Op } = require('sequelize');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Obtener usuario autenticado
exports.getMe = (req, res) => {
  // Implementa la lógica de usuario autenticado aquí
  res.json(req.user);
};

// Buscar usuarios avanzado
exports.buscarUsuarios = async (req, res) => {
  // Implementa la lógica de búsqueda aquí
  res.json([]);
};

// Listar usuarios
exports.obtenerUsuarios = async (req, res) => {
  // Implementa la lógica de obtener usuarios aquí
  res.json([]);
};

// Obtener usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  // Implementa la lógica de obtener usuario por ID aquí
  res.json({});
};

// Crear usuario
exports.crearUsuario = async (req, res) => {
  // Validación de campos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errores: errors.array() });
  }
  // No permitir admin desde frontend
  if (req.body.rol && req.body.rol === 'admin') {
    return res.status(403).json({ mensaje: 'No puedes crear administradores desde el registro público' });
  }
  try {
    // Verifica correo único
    const existe = await User.findOne({ where: { correo: req.body.correo } });
    if (existe) {
      return res.status(409).json({ mensaje: 'El correo ya está registrado' });
    }
    // Encripta contraseña
    const hash = await bcrypt.hash(req.body.contraseña, 10);
    const data = { ...req.body, contraseña: hash, rol: req.body.rol === 'artesano' ? 'artesano' : 'cliente' };
    // Elimina campos no permitidos
    delete data.confirmar_contraseña;
    // Crea usuario
    const user = await User.create(data);
    const { contraseña, ...userData } = user.toJSON();
    res.status(201).json(userData);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Actualizar usuario (solo campos permitidos y solo dueño o admin)
exports.actualizarUsuario = async (req, res) => {
  const camposPermitidos = [
    'nombre_completo', 'telefono', 'direccion', 'ciudad', 'pais', 'foto_perfil',
    'descripcion', 'especialidades', 'portafolio', 'redes_sociales', 'disponibilidad',
    'metodos_pago_aceptados', 'ubicacion_precisa', 'certificaciones', 'experiencia_anios'
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
  // Implementa la lógica de eliminación aquí
  res.json({ mensaje: 'Usuario eliminado (implementa la lógica)' });
};