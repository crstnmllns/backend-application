const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !price) {
      return res
        .status(400)
        .json({ msg: "El nombre y el precio son obligatorios" });
    }

    const newProduct = new Product({
      name,
      description,
      price
    });
    await newProduct.save();

    return res.status(201).json({ msg: "Producto creado", product: newProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al crear producto" });
  }
};

exports.readAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al obtener productos" });
  }
};

exports.readOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }
    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al obtener producto" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;

    await product.save();
    return res.json({ msg: "Producto actualizado", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al actualizar producto" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    return res.json({ msg: "Producto eliminado", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al eliminar producto" });
  }
};
