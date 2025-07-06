const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { body } = require('express-validator');

// Registro público (solo cliente o artesano)
router.post('/',
  [
    body('nombre_completo').notEmpty().withMessage('Nombre completo requerido'),
    body('correo').isEmail().withMessage('Correo inválido'),
    body('contraseña').isLength({ min: 8 }).withMessage('Contraseña debe tener al menos 8 caracteres'),
    body('confirmar_contraseña').custom((value, { req }) => value === req.body.contraseña).withMessage('Las contraseñas no coinciden'),
    body('rol').optional().isIn(['cliente', 'artesano']).withMessage('Rol inválido'),
    // Opcionales
    body('telefono').optional().isString(),
    body('genero').optional().isString(),
    body('fecha_nacimiento').optional().isDate(),
    body('direccion').optional().isString(),
    body('ciudad').optional().isString(),
    body('pais').optional().isString(),
    // Artesano extra
    body('descripcion').optional().isString(),
    body('especialidades').optional().isString(),
    body('portafolio').optional().isString(),
    body('redes_sociales').optional().isString(),
    body('metodos_pago_aceptados').optional().isString(),
    body('certificaciones').optional().isString(),
    body('experiencia_anios').optional().isInt(),
    body('ubicacion_precisa').optional().isString()
  ],
  userController.crearUsuario
);
router.post('/login',
  [
    body('correo').isEmail().withMessage('Correo inválido'),
    body('contraseña').notEmpty().withMessage('Contraseña requerida')
  ],
  userController.login
);

// Obtener todos los usuarios (solo admin, excepto filtro de artesanos)
router.get('/', userController.obtenerUsuarios);

// Obtener usuario por ID (público)
router.get('/:id', userController.obtenerUsuarioPorId);

// Perfil propio (requiere login)
router.get('/me', authMiddleware, userController.getMe);

// Búsqueda avanzada (opcional)
router.get('/search', userController.buscarUsuarios);

// Actualizar y eliminar usuario (puedes proteger si quieres)
router.put('/:id', authMiddleware, userController.actualizarUsuario);
router.delete('/:id', authMiddleware, adminMiddleware, userController.eliminarUsuario);

module.exports = router;