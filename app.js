// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors({
  origin: '*', // Cambia esto por el dominio de tu frontend en producción
  credentials: true
}));
app.use(express.json());

// Rate limiting: 100 requests por 15 minutos por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones, intenta más tarde.'
});
app.use(limiter);

// Logging básico
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/pedidos', pedidoRoutes);thMiddleware');

// Ejemplo: proteger pedidos
app.use('/api/pedidos', auth, pedidoRoutes);tes');
const productRoutes = require('./routes/productRoutes');
// Ruta de pruebas = require('./routes/resenaRoutes');
app.get('/', (req, res) => {e('./routes/mensajeRoutes');
  res.send('API backend funcionando');/pedidoRoutes');
});.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);utes);
outes);
module.exports = app;
// Ejemplo: proteger pedidos
app.use('/api/pedidos', auth, pedidoRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API backend funcionando');
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ mensaje: err.message || 'Error interno del servidor' });
});

module.exports = app;
