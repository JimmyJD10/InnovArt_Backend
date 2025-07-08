const Pedido = require('../models/Pedido');
const Review = require('../models/Review');

exports.obtenerPedidos = async (req, res) => {
  try {
    const where = {};
    if (req.query.clienteId) where.clienteId = req.query.clienteId;
    if (req.query.productoId) where.productoId = req.query.productoId;
    const pedidos = await Pedido.findAll({ where });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
};

exports.obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedido' });
  }
};

exports.crearPedido = async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear pedido' });
  }
};

exports.actualizarPedido = async (req, res) => {
  try {
    await Pedido.update(req.body, { where: { id: req.params.id } });
    const pedido = await Pedido.findByPk(req.params.id);
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar pedido' });
  }
};

exports.eliminarPedido = async (req, res) => {
  try {
    await Pedido.destroy({ where: { id: req.params.id } });
    res.json({ mensaje: 'Pedido eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar pedido' });
  }
};

exports.buscarPedidos = async (req, res) => {
  try {
    const { q } = req.query;
    const where = {};
    if (q) {
      where.estado = { $like: `%${q}%` };
    }
    const pedidos = await Pedido.findAll({ where, limit: 10 });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar pedidos' });
  }
};
