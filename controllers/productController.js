const { Op } = require('sequelize');
const Product = require('../models/Product');
const User = require('../models/User');
const Review = require('../models/Review');

// Crear producto
exports.crearProducto = async (req, res) => {
  try {
    const data = req.body;
    if (req.files && req.files.length > 0) {
      data.imagenes = JSON.stringify(req.files.map(f => `/uploads/${f.filename}`));
      data.imagen = `/uploads/${req.files[0].filename}`;
    }
    const usuarioId = req.user.id;
    const producto = await Product.create({
      ...data,
      usuarioId,
      fecha_publicacion: new Date()
    });
    res.status(201).json(producto);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear producto' });
  }
};

// Obtener todos los productos (incluye artesano y calificación promedio)
exports.obtenerProductos = async (req, res) => {
  try {
    const where = {};
    if (req.query.categoria) where.categoria = req.query.categoria;
    if (req.query.ubicacion) where.ubicacion = req.query.ubicacion;
    if (req.query.usuarioId) where.usuarioId = req.query.usuarioId;
    if (req.query.destacados) where.destacado = req.query.destacados === '1' || req.query.destacados === 'true';

    // Paginación
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const offset = (page - 1) * limit;

    const productos = await Product.findAll({
      where,
      limit,
      offset,
      order: [['fecha_publicacion', 'DESC']],
      include: [
        {
          model: User,
          as: 'artesano',
          attributes: ['id', 'nombre_completo', 'foto_perfil', 'ciudad', 'pais', 'calificacion_promedio']
        }
      ]
    });

    res.json(productos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
};

// Obtener producto por ID (incluye artesano)
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Product.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'artesano',
          attributes: ['id', 'nombre_completo', 'foto_perfil', 'ciudad', 'pais', 'calificacion_promedio']
        }
      ]
    });
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener producto' });
  }
};

// Buscar productos por texto
exports.buscarProductos = async (req, res) => {
  try {
    const q = req.query.q;
    const where = {};
    if (q) {
      where[Op.or] = [
        { titulo: { [Op.like]: `%${q}%` } },
        { descripcion: { [Op.like]: `%${q}%` } },
        { categoria: { [Op.like]: `%${q}%` } }
      ];
    }
    const productos = await Product.findAll({
      where,
      limit: 20,
      order: [['fecha_publicacion', 'DESC']],
      include: [
        {
          model: User,
          as: 'artesano',
          attributes: ['id', 'nombre_completo', 'foto_perfil']
        }
      ]
    });
    res.json(productos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al buscar productos' });
  }
};

// Actualizar producto (solo dueño o admin)
exports.actualizarProducto = async (req, res) => {
  try {
    const producto = await Product.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

    // Solo el dueño o admin puede editar
    if (req.user.rol !== 'admin' && producto.usuarioId !== req.user.id) {
      return res.status(403).json({ mensaje: 'No autorizado para editar este producto' });
    }

    await producto.update(req.body);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar producto' });
  }
};

// Eliminar producto (solo dueño o admin)
exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Product.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

    // Solo el dueño o admin puede eliminar
    if (req.user.rol !== 'admin' && producto.usuarioId !== req.user.id) {
      return res.status(403).json({ mensaje: 'No autorizado para eliminar este producto' });
    }

    await producto.destroy();
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto' });
  }
};
    res.json({ mensaje: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar producto' });
  }
};
