
# Backend Application

Este proyecto implementa autenticación con **JWT** y un CRUD de **productos** usando **Node.js**, **Express** y **MongoDB**, con documentación **Swagger** para probar fácilmente todos los endpoints.

---

## Requisitos previos

- Node.js instalado (v14+)
- MongoDB Compass

---

## 1. Clonar el repositorio

```bash
git clone git@github.com:crstnmllns/backend-application.git
cd backend-application
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Crear archivo `.env`

En la raíz del proyecto, crea un archivo llamado `.env` con el siguiente contenido:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/miBaseDeDatos
JWT_SECRET=un_secreto_largo_y_seguro
```

---

## 4. Iniciar el servidor

### Modo desarrollo (con nodemon):

```bash
npm run dev
```

### Modo producción:

```bash
npm start
```

---

## 5. Probar los endpoints en Swagger

1. Abre tu navegador en:  
   👉 `http://localhost:3000/api-docs`

2. Desde Swagger UI podrás:
   - Ver todos los endpoints disponibles
   - Leer sus descripciones y ejemplos
   - Hacer pruebas directamente con “Try it out”

3. **Flujo para rutas protegidas (requieren token JWT):**

   ### a. Registrar un usuario  
   - Ir a `POST /api/user/register`
   - Click en “Try it out”
   - Completar los campos y presionar “Execute”

   ### b. Iniciar sesión  
   - Ir a `POST /api/user/login`
   - Ejecutar la petición con email y password registrados
   - Copiar el **token JWT** del campo `"token"` en la respuesta

   ### c. Autorizarte en Swagger  
   - Click en el botón **“Authorize”** arriba a la derecha
   - Pega el token (usualmente sin la palabra “Bearer”)
   - Presiona “Authorize” y luego “Close”

   ### d. Usar endpoints protegidos  
   - Ahora puedes acceder a rutas como:
     - `POST /api/product/create`
     - `PUT /api/user/update`
     - `DELETE /api/product/delete/{id}`
   - Swagger enviará el token automáticamente en el header:
     ```
     Authorization: Bearer <token>
     ```

---

## 6. Endpoints principales

### Usuarios (`/api/user`)
- `POST /register` – Crear nuevo usuario
- `POST /login` – Iniciar sesión y obtener JWT
- `GET /verifytoken` – Verificar token (requiere autenticación)
- `PUT /update` – Actualizar datos del usuario (requiere autenticación)

### Productos (`/api/product`)
- `POST /create` – Crear producto (requiere autenticación)
- `GET /readall` – Listar todos los productos (público)
- `GET /readone/:id` – Ver un producto por ID
- `PUT /update/:id` – Editar un producto (requiere autenticación)
- `DELETE /delete/:id` – Eliminar producto (requiere autenticación)

---

## 7. Visualizar datos en MongoDB Compass

1. Abre **MongoDB Compass**
2. Conéctate a `mongodb://127.0.0.1:27017` (o a tu URI de Atlas)
3. Selecciona la base de datos (`miBaseDeDatos`, por ejemplo)
4. Verás las colecciones `users`, `products`, etc.
5. Da clic en una colección para ver los registros insertados



