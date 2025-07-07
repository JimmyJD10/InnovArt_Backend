const User = require('../models/User');
const Product = require('../models/Product');
const Pedido = require('../models/Pedido');
const Reseña = require('../models/Reseña'); // Asegúrate que el archivo y modelo existen y usan la ñ
// Agrega otros modelos si es necesario

exports.getSummary = async (req, res) => {
  try {
    const totalUsuarios = await User.count();
    const totalArtesanos = await User.count({ where: { rol: 'artesano' } });
    const totalProductos = await Product.count();
    const totalPedidos = await Pedido.count();
    let totalReseñas = 0;
    try {
      totalReseñas = await Reseña.count();
    } catch (err) {
      console.error('Error contando reseñas:', err.message);
    }
    // Puedes agregar más métricas aquí

    res.json({
      totalUsuarios,
      totalArtesanos,
      totalProductos,
      totalPedidos,
      totalReseñas,
      reportesPendientes: 0, // Implementa si tienes reportes
      usuariosRecientes: [],
      productosRecientes: [],
      pedidosRecientes: [],
      reportesRecientes: [],
      graficoUsuarios: [],
      graficoRoles: [],
      graficoCategorias: [],
      graficoPedidos: []
    });
  } catch (error) {
    console.error('Error en getSummary:', error);
    res.status(500).json({ mensaje: 'Error al obtener el resumen', error: error.message });
  }
};
