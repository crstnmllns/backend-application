/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para usuarios
 */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       description: Datos necesarios para crear un usuario
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Usuario creado con éxito
 *       400:
 *         description: Error en datos o el usuario ya existe
 */
router.post("/register", userController.register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Inicia sesión y retorna un token JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login exitoso, retorna el token y datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Login exitoso
 *                 token:
 *                   type: string
 *                   example: <JWT_TOKEN_AQUI>
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 63f9b85f9d05c72079f8a721
 *                     name:
 *                       type: string
 *                       example: Juan
 *                     email:
 *                       type: string
 *                       example: juan@example.com
 *       400:
 *         description: Credenciales inválidas
 */
router.post("/login", userController.login);

/**
 * @swagger
 * /api/user/verifytoken:
 *   get:
 *     summary: Verifica el token JWT del usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Token válido
 *                 user:
 *                   type: object
 *                   example:
 *                     userId: 63f9b85f9d05c72079f8a721
 *       401:
 *         description: Token ausente o inválido
 */
router.get("/verifytoken", authMiddleware, userController.verifyToken);

/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: Actualiza datos del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Campos a modificar (name, email, password)
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Modificado
 *               email:
 *                 type: string
 *                 example: nuevo@example.com
 *               password:
 *                 type: string
 *                 example: nuevaPass123
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       401:
 *         description: Faltó token JWT o es inválido
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/update", authMiddleware, userController.updateUser);

module.exports = router;
