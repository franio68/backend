// index.js
const mongoose = require('mongoose');

mongoose
	.connect(
		'mongodb+srv://frandavila:cife1234@clusterio.3fznd.mongodb.net/academia?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log('Conexión con Atlas exitosa...');
	})
	.catch((error) => console.log(error));

const cursoSchema = new mongoose.Schema({
	// ? Creamos el nuevo Schema
	// ?Añadimos los diferentes tipos de contenido (campos) e indicamos su tipo.
	curso: {
		type: String,
		required: true,
		trim: true,
	},
	docente: {
		type: String,
		required: true,
		trim: true,
	},
	precio: {
		type: Number,
		min: [1000, 'Curso muy barato. Sube el precio'],
		max: [10000, 'Curso muy caro. Baja el precio'],
		enum: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
	},
});

// ? Creamos el Modelo
const Curso = mongoose.model('Curso', cursoSchema);

// ? Creamos y guardamos un curso nuevo basado en el Modelo
// const docker = new Curso({
// 	curso: 'Conceptos básicos de Docker',
// 	docente: 'John Johnson',
// 	precio: 3000,
// });

// docker
// 	.save()
// 	.then(() => {
// 		console.log('Curso Docker guardado!');
// 	})
// 	.catch((err) => {
// 		console.log('Se producido un error: ' + err.message);
// 	});

// ? Buscar en la BDD
// Curso.find({ docente: 'John Johnson' }).then((datos) => {
// 	console.log(datos);
// });

// // ? --- Buscar el primer documento que cumpla el criterio
// Curso.findOne({ docente: "Fran 'the Master' Dávila" }).then((datos) => {
// 	console.log(datos);
// });

// ? --- Buscar un documento por su id
// Curso.findById('62f801ff4f6b331691820ea8').then((datos) => {
// 	console.log(datos);
// });

// ? Actualizar documentos
// ? --- Actualizar el primer documento que cumpla con la condición que le pasamos al método
// Curso.updateOne({ docente: 'John Johnson' }, { precio: 8000 }).then((datos) => {
// 	console.log(datos);
// });

// ? --- Actualizar varios documentos a la vez
// Curso.updateMany(
// 	{ docente: { $in: ['Lara Mara', 'Selena di Napoli'] } },
// 	{ $set: { precio: 1000 } }
// ).then((datos) => {
// 	console.log(datos);
// });

// ? --- Método findOneAndUpdate ... (En el objeto que devuelve NO se muestra el campo que se ha modificado)
// Curso.findOneAndUpdate({ docente: 'John Johnson' }, { precio: 11000 }).then(
// 	(datos) => {
// 		console.log(datos);
// 	}
// );

// ? --- Método findOneAndUpdate que devuelve el objeto y muestra el valor modificado
// Curso.findOneAndUpdate(
// 	{ docente: 'John Johnson' },
// 	{ precio: 12000 },
// 	{ new: true}
// ).then((datos) => {
// 	console.log(datos);
// });

// ? Eliminar documentos de la BDD
// ? --- Buscar el primer documento que cumpla la condición y borrarlo
// Curso.deleteOne({ precio: 1001 }).then((datos) => {
// 	console.log(datos);
// });

// Curso.deleteMany({ docente: { $in: ['John Johnson'] } }).then((datos) => {
// 	console.log(datos);
// });

// ? --- findOneAndDelete: Localiza y elimina el documento: Devuelve el objeto eliminado
// Curso.findOneAndDelete({ docente: 'John Johnson' }).then((datos) => {
// 	console.log(datos);
// });

// ? Validar correctamente al actualizar un documento usando runValidators: true
// Curso.findOneAndUpdate(
// 	{ docente: 'John Johnson' },
// 	{ precio: 11000 }, // ! Debe dar error al poner este valor, ya que supera los 10000
// 	{ new: true, runValidators: true } // ! Siempre y cuando runValidators valga true.
// ).then((datos) => {
// 	console.log(datos);
// });
