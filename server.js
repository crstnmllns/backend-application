require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);


const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("./docs/swagger");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
