// modelo-docente.js
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const docenteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
  cursos: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Curso",
    },
  ],
  activo: {
    type: String,
    required: false,
  },
  foto: {
    type: String,
  },
});

docenteSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Docente", docenteSchema);
