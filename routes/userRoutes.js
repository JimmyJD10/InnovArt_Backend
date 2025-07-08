const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Buscar usuarios avanzado
router.get('/search', userController.buscarUsuarios);

// Obtener usuario autenticado
router.get('/me', authMiddleware, userController.getMe);

// Listar usuarios (con filtros por rol, destacados, etc)
router.get('/', userController.obtenerUsuarios);

// Obtener usuario por ID
router.get('/:id', userController.obtenerUsuarioPorId);

// Crear usuario (registro)
router.post('/',
  [
    body('nombre_completo').notEmpty().withMessage('Nombre requerido'),
    body('correo').isEmail().withMessage('Correo inválido'),
    body('contraseña').isLength({ min: 8 }).withMessage('Contraseña mínima 8 caracteres')
  ],
  upload.single('foto_perfil'), 
  userController.registrarUsuario
);

// Login
router.post('/login',
  [
    body('correo').isEmail().withMessage('Correo inválido'),
    body('contraseña').notEmpty().withMessage('Contraseña requerida')
  ],
  userController.loginUsuario
);

// Actualizar usuario (propio o admin)
router.put('/:id', upload.single('foto_perfil'), authMiddleware, userController.actualizarUsuario);

// Eliminar usuario (propio o admin)
router.delete('/:id', authMiddleware, userController.eliminarUsuario);

module.exports = router;