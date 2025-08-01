// Script para poblar la tabla de productos con productos de prueba asociados a artesanos
const Product = require('../models/Product');
const sequelize = require('../config/db');
require('dotenv').config();

const imagenes = [
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1526178613658-3f1622045557?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80'
];

async function seed() {
  await sequelize.sync();

  const productos = [];
  for (let i = 1; i <= 25; i++) {
    productos.push({
      titulo: `Producto Artesanal ${i}`,
      descripcion: `Descripción del producto artesanal número ${i}. Hecho a mano con materiales de calidad.`,
      precio: (Math.random() * 100 + 20).toFixed(2),
      imagen: imagenes[i % imagenes.length],
      categoria: i % 2 === 0 ? 'Cerámica' : 'Textiles',
      usuarioId: i + 25, // Relacionado con artesano (id 26-50)
      destacado: i % 5 === 0,
      stock: Math.floor(Math.random() * 20) + 1,
      ubicacion: 'Cusco',
      fecha_publicacion: new Date()
    });
  }

  await Product.bulkCreate(productos, { ignoreDuplicates: true });
  console.log('Productos de prueba insertados correctamente');
  process.exit();
}

seed();