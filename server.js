// server.js
  const app = require('./app');
  const sequelize = require('./config/db');
  const PORT = process.env.PORT || 3001;
  const rateLimit = require('express-rate-limit');

  // Aumenta el límite o comenta para desarrollo
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 1000, // por ejemplo, 1000 peticiones por IP
    message: 'Demasiadas peticiones, intenta más tarde.'
  });

  app.use(limiter);

  // Sincroniza los modelos con la base de datos
  sequelize.sync() // Usa { force: true } solo si quieres borrar y recrear todo cada vez
    .then(() => {
      console.log(' Tablas sincronizadas');
      return sequelize.authenticate();
    })
    .then(() => {
      console.log(' Conectado a la base de datos');
      app.listen(PORT, '0.0.0.0', () => {
        console.log(` Servidor backend escuchando en puerto ${PORT}`);
      });
    })
    .catch(err => {
      console.error(' Error al conectar con la base de datos:', err);
    });

  setInterval(() => {}, 1000 * 60 * 60); // Mantiene el proceso vivo para debug
  
  process.on('uncaughtException', err => {
    console.error('Uncaught Exception:', err);
  });
  process.on('unhandledRejection', err => {
    console.error('Unhandled Rejection:', err);
  });
