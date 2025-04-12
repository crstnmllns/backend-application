/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints para productos
 */

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/product/create:
 *   post:
 *     summary: Crea un nuevo producto (requiere token)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Datos del nuevo producto
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Computadora
 *               description:
 *                 type: string
 *                 example: "Laptop Core i5 con 8GB RAM"
 *               price:
 *                 type: number
 *                 example: 500
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Faltan campos obligatorios (name, price)
 *       401:
 *         description: Token ausente o inválido
 */
router.post("/create", authMiddleware, productController.createProduct);

/**
 * @swagger
 * /api/product/readall:
 *   get:
 *     summary: Obtiene todos los productos (público)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 63f9b85f9d05c72079f8a721
 *                   name:
 *                     type: string
 *                     example: Computadora
 *                   description:
 *                     type: string
 *                     example: "Laptop Core i5 con 8GB RAM"
 *                   price:
 *                     type: number
 *                     example: 500
 *       500:
 *         description: Error interno al obtener productos
 */
router.get("/readall", productController.readAllProducts);

/**
 * @swagger
 * /api/product/readone/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID (público)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: string
 *           example: 63f9b85f9d05c72079f8a721
 *     responses:
 *       200:
 *         description: Retorna el producto solicitado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno al obtener el producto
 */
router.get("/readone/:id", productController.readOneProduct);

/**
 * @swagger
 * /api/product/update/{id}:
 *   put:
 *     summary: Actualiza un producto (requiere token)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto a actualizar
 *         required: true
 *         schema:
 *           type: string
 *           example: 63f9b85f9d05c72079f8a721
 *     requestBody:
 *       required: true
 *       description: Campos a actualizar del producto
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Computadora Actualizada
 *               description:
 *                 type: string
 *                 example: "Laptop Core i7 con 16GB RAM"
 *               price:
 *                 type: number
 *                 example: 900
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       401:
 *         description: Token ausente o inválido
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno al actualizar producto
 */
router.put("/update/:id", authMiddleware, productController.updateProduct);

/**
 * @swagger
 * /api/product/delete/{id}:
 *   delete:
 *     summary: Elimina un producto (requiere token)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto a eliminar
 *         required: true
 *         schema:
 *           type: string
 *           example: 63f9b85f9d05c72079f8a721
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito
 *       401:
 *         description: Token ausente o inválido
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno al eliminar producto
 */
router.delete("/delete/:id", authMiddleware, productController.deleteProduct);

module.exports = router;
