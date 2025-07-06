const Product = require('../models/Product');
const User = require('../models/User');
const Resena = require('../models/Resena');

// Crear producto
exports.crearProducto = async (req, res) => {
  res.json({ mensaje: 'Producto creado (implementa la lógica)' });
};

// Obtener todos los productos (incluye artesano y calificación promedio)
exports.obtenerProductos = async (req, res) => {
  res.json([]);
};

// Obtener producto por ID
exports.obtenerProductoPorId = async (req, res) => {
  res.json({});
};

// Actualizar producto
exports.actualizarProducto = async (req, res) => {
  res.json({ mensaje: 'Producto actualizado (implementa la lógica)' });
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
  res.json({ mensaje: 'Producto eliminado (implementa la lógica)' });
};

exports.buscarProductos = async (req, res) => {
  res.json([]);
};
          as: 'artesano',
          attributes: ['id', 'nombre_completo']
        }
      ]
    });

    // Calcular calificación promedio para cada producto
    const productsWithRating = await Promise.all(products.map(async (p) => {
      const resenas = await Resena.findAll({ where: { productoId: p.id } });
      let calificacion_promedio = 0;
      if (resenas.length > 0) {
        calificacion_promedio = resenas.reduce((acc, r) => acc + (r.calificacion || 0), 0) / resenas.length;
      }
      return {
        ...p.toJSON(),
        artesano: p.artesano,
        calificacion_promedio
      };
    }));

    res.json(productsWithRating);
  } catch (error) {
    console.error('Error en obtenerProductos:', error);
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
};

// Obtener producto por ID
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar producto
exports.actualizarProducto = async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    const product = await Product.findByPk(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.status(200).json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
