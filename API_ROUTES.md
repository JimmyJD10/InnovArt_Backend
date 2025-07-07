# Rutas disponibles en el backend InnovArt

## Usuarios (`/api/users`)
- `GET    /api/users`                  → Listar usuarios (filtros: `rol`, `destacados`)
- `GET    /api/users/search?q=...`     → Buscar usuarios por texto
- `GET    /api/users/me`               → Obtener usuario autenticado (JWT)
- `GET    /api/users/:id`              → Obtener usuario por ID
- `POST   /api/users`                  → Registrar usuario
- `POST   /api/users/login`            → Login de usuario
- `PUT    /api/users/:id`              → Actualizar usuario (propio o admin)
- `DELETE /api/users/:id`              → Eliminar usuario (propio o admin)

---

## Productos (`/api/products`)
- `GET    /api/products`               → Listar productos (filtros: `categoria`, `ubicacion`, `usuarioId`, `destacados`)
- `GET    /api/products/search?q=...`  → Buscar productos por texto
- `GET    /api/products/:id`           → Obtener producto por ID
- `POST   /api/products`               → Crear producto (requiere JWT)
- `PUT    /api/products/:id`           → Actualizar producto (dueño o admin)
- `DELETE /api/products/:id`           → Eliminar producto (dueño o admin)

---

## Pedidos (`/api/pedidos`)
- `GET    /api/pedidos`                → Listar pedidos (filtros: `clienteId`, `productoId`)
- `GET    /api/pedidos/search?q=...`   → Buscar pedidos por estado
- `GET    /api/pedidos/:id`            → Obtener pedido por ID
- `POST   /api/pedidos`                → Crear pedido (requiere JWT)
- `PUT    /api/pedidos/:id`            → Actualizar pedido (requiere JWT)
- `DELETE /api/pedidos/:id`            → Eliminar pedido (requiere JWT)

---

## Reseñas (`/api/reseñas`)
- `GET    /api/reseñas`                → Listar reseñas (filtros: `artesanoId`, `productoId`, `clienteId`, `destacadas`)
- `GET    /api/reseñas/search?q=...`   → Buscar reseñas por texto
- `GET    /api/reseñas/:id`            → Obtener reseña por ID
- `POST   /api/reseñas`                → Crear reseña (requiere JWT)
- `PUT    /api/reseñas/:id`            → Actualizar reseña (requiere JWT)
- `DELETE /api/reseñas/:id`            → Eliminar reseña (requiere JWT)

---

## Mensajes (`/api/mensajes`)
- `GET    /api/mensajes`               → Listar mensajes (filtros: `remitenteId`, `destinatarioId`)
- `GET    /api/mensajes/search?q=...`  → Buscar mensajes por texto
- `GET    /api/mensajes/:id`           → Obtener mensaje por ID
- `POST   /api/mensajes`               → Crear mensaje (requiere JWT)
- `PUT    /api/mensajes/:id`           → Actualizar mensaje (requiere JWT)
- `DELETE /api/mensajes/:id`           → Eliminar mensaje (requiere JWT)

---

## Admin (si tienes implementado)
- `GET    /api/admin/summary`          → Resumen de estadísticas (requiere admin)

---

## Otros (si tienes implementado)
- `/api/categorias` (CRUD de categorías)
- `/api/reportes` (gestión de reportes)
- `/api/notificaciones` (notificaciones de usuario)
- `/api/artesano/summary` (resumen para dashboard de artesano)

---

**Notas:**
- Los endpoints `POST`, `PUT`, `DELETE` suelen requerir autenticación (JWT).
- Los filtros por query string (`?rol=artesano`, `?categoria=...`, etc.) están soportados en la mayoría de endpoints de listado.
- Si agregas nuevas rutas, sigue el mismo patrón RESTful.

---
