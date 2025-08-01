// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const mensajeRoutes = require('./routes/mensajeRoutes');
const adminRoutes = require('./routes/adminRoutes');

const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://3.148.112.19:3000',
    'http://3.139.97.189:3000'
  ],
  credentials: true
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
app.use('/api/reviews', reviewRoutes);
app.use('/api/mensajes', mensajeRoutes);
app.use('/api/admin', adminRoutes);

// Servir la carpeta de imágenes subidas
app.use('/uploads', require('express').static(path.join(__dirname, 'uploads')));

// Middleware global de manejo de errores
app.use(errorHandler);

// Si prefieres levantar el servidor directamente aquí, descomenta esto:
// app.listen(process.env.PORT || 3001, () => {
//   console.log('Servidor iniciado');
// });

module.exports = app; // Exporta o inicia el servidor
module.exports = app; // Exporta o inicia el servidor
