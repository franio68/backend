// modelo-curso.js
const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
	// ? Creamos el nuevo Schema
	// ?Añadimos los diferentes tipos de contenido (campos) e indicamos su tipo.
	curso: {
		type: String,
		required: true,
		trim: true,
	},
	docente: {
		type: mongoose.Types.ObjectId,
		trim: true,
		ref: 'Docente',
	},
	opcion: {
		type: String,
		required: true,
		enum: ['On-line', 'Presencial'],
	},
	aula: {
		type: String,
		trim: true,
		enum: ['Aula 1', 'Aula 2', 'Aula 3', 'Aula 4', 'Aula Virtual'],
	},
	precio: {
		type: Number,
		min: 1000,
		max: 10000,
		enum: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
	},
});

// ? Creamos el Modelo
module.exports = mongoose.model('Curso', cursoSchema);
