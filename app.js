// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Logging básico
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

const auth = require('./middlewares/authMiddleware');

// Rutas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const resenaRoutes = require('./routes/resenaRoutes');
const mensajeRoutes = require('./routes/mensajeRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/resenas', resenaRoutes);
app.use('/api/mensajes', mensajeRoutes);
app.use('/api/pedidos', pedidoRoutes);

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
