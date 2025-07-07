// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const pedidoRoutes = require('./routes/pedidoRoutes');
const reseñaRoutes = require('./routes/reseñaRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
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

app.use('/api/pedidos', pedidoRoutes);
app.use('/api/reseñas', reseñaRoutes);

// Ejemplo: proteger pedidos
app.use('/api/pedidos', authMiddleware, pedidoRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API backend funcionando');
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    ok: false,
    mensaje: err.message || 'Error interno del servidor',
    detalles: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Asegúrate de que el cierre de llaves sea correcto al final del archivo.
// El archivo debe terminar así:

// ...rutas y middlewares...

// Manejo global de errores (si tienes)
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Exporta o inicia el servidor
module.exports = app;
// O si usas directamente aquí:
// app.listen(process.env.PORT || 3001, () => {
//   console.log('Servidor iniciado');
// });

// No debe haber un `});` suelto al final.
