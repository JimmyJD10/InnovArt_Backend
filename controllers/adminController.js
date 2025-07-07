const User = require('../models/User');
const Product = require('../models/Product');
const Pedido = require('../models/Pedido');
const Resena = require('../models/Resena'); // O Reseña según tu modelo
// Agrega otros modelos si es necesario

exports.getSummary = async (req, res) => {
  try {
    const totalUsuarios = await User.count();
    const totalArtesanos = await User.count({ where: { rol: 'artesano' } });
    const totalProductos = await Product.count();
    const totalPedidos = await Pedido.count();
    const totalReseñas = await Resena.count();
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
    res.status(500).json({ mensaje: 'Error al obtener el resumen' });
  }
};
