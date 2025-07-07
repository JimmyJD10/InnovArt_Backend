// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const reseñaRoutes = require('./routes/reseñaRoutes');
const mensajeRoutes = require('./routes/mensajeRoutes');
const adminRoutes = require('./routes/adminRoutes');

const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(morgan('dev'));

// Limitar solo login y registro
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Demasiadas peticiones de autenticación, intenta más tarde.'
});

// Aplica solo a rutas de autenticación
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);

// Rutas principales
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/reseñas', reseñaRoutes);
app.use('/api/mensajes', mensajeRoutes);
app.use('/api/admin', adminRoutes);

// Middleware global de manejo de errores
app.use(errorHandler);

// Si prefieres levantar el servidor directamente aquí, descomenta esto:
// app.listen(process.env.PORT || 3001, () => {
//   console.log('Servidor iniciado');
// });

module.exports = app; // Exporta o inicia el servidor
