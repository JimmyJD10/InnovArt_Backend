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

const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Rate limiting: 100 requests por 15 minutos por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones, intenta más tarde.'
});
app.use(limiter);

// Rutas principales
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/reseñas', reseñaRoutes);
app.use('/api/mensajes', mensajeRoutes);

// Middleware global de manejo de errores
app.use(errorHandler);

// Exporta o inicia el servidor
module.exports = app;

// Si prefieres levantar el servidor directamente aquí, descomenta esto:
// app.listen(process.env.PORT || 3001, () => {
//   console.log('Servidor iniciado');
// });
