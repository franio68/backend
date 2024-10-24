// index.js
const mongoose = require("mongoose");
const express = require("express");
// const cors = require("cors");
require("dotenv").config();

PORT = 5000;
console.log("Puerto modificado probando git");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());

const rutasCursos = require("./routes/rutas-cursos");
app.use("/api/cursos", rutasCursos);

const rutasDocentes = require("./routes/rutas-docentes-no-auth");
app.use("/api/docentes", rutasDocentes);

app.use((req, res) => {
  // Middleware que se ejecuta cuando el servidor no tiene la ruta que se ha enviado desde el cliente
  res.status(404);
  res.json({
    mensaje: "Información no encontrada",
  });
});

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("💯 Conectado con éxito a Atlas");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🧏‍♀️ Escuchando en puerto ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));
