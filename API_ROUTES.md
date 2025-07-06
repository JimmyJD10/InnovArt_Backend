# Rutas principales de la API InnovArt

## Usuarios (`/api/users`)
- `POST   /api/users`                → Crear usuario (registro)
- `POST   /api/users/login`          → Login de usuario
- `GET    /api/users`                → Listar usuarios (filtros: ?rol=artesano, ?destacados=true)
- `GET    /api/users/me`             → Obtener usuario autenticado (requiere token)
- `GET    /api/users/:id`            → Obtener usuario por ID
- `PUT    /api/users/:id`            → Actualizar usuario (requiere token)
- `DELETE /api/users/:id`            → Eliminar usuario (admin)

## Productos (`/api/products`)
- `POST   /api/products`             → Crear producto
- `GET    /api/products`             → Listar productos (filtros: ?categoria, ?ubicacion, ?usuarioId, ?destacados=1)
- `GET    /api/products/:id`         → Obtener producto por ID
- `PUT    /api/products/:id`         → Actualizar producto
- `DELETE /api/products/:id`         → Eliminar producto

## Pedidos (`/api/pedidos`)
- `POST   /api/pedidos`              → Crear pedido (requiere token)
- `GET    /api/pedidos`              → Listar pedidos (requiere token)
- `GET    /api/pedidos/:id`          → Obtener pedido por ID (requiere token)
- `PUT    /api/pedidos/:id`          → Actualizar pedido (requiere token)
- `DELETE /api/pedidos/:id`          → Eliminar pedido (admin)
- `GET    /api/pedidos/carrito`      → Obtener carrito del usuario autenticado
- `DELETE /api/pedidos/carrito/:id`  → Eliminar producto del carrito

## Reseñas (`/api/resenas`)
- `POST   /api/resenas`              → Crear reseña
- `GET    /api/resenas`              → Listar reseñas (filtros: ?destacadas=1, ?productoId, ?artesanoId)
- `GET    /api/resenas/:id`          → Obtener reseña por ID
- `PUT    /api/resenas/:id`          → Actualizar reseña
- `DELETE /api/resenas/:id`          → Eliminar reseña (admin)

## Mensajes (`/api/mensajes`)
- `POST   /api/mensajes`             → Crear mensaje
- `GET    /api/mensajes`             → Listar mensajes
- `GET    /api/mensajes/:id`         → Obtener mensaje por ID
- `DELETE /api/mensajes/:id`         → Eliminar mensaje (admin)

## Admin (`/api/admin`)
- `GET    /api/admin/summary`        → Resumen de estadísticas (usuarios, productos, pedidos, mensajes) (admin)

```

**Notas:**
- Todas las rutas que requieren autenticación deben enviarse con el header `Authorization: Bearer <token>`.
- Las rutas de eliminación y actualización suelen requerir permisos de admin o del propio usuario.
- Puedes agregar filtros por query string en la mayoría de los GET (ver comentarios).
