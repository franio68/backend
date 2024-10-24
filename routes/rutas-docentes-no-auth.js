// rutas-docentes.js
const { response } = require("express");
const express = require("express");
const router = express.Router();

const Docente = require("../models/modelo-docente");

// * Listar todos los docentes
router.get("/", async (req, res, next) => {
  let docentes;
  try {
    docentes = await Docente.find({}, "-password").populate("cursos");
  } catch (err) {
    const error = new Error("Ha ocurrido un error en la recuperación de datos");
    error.code = 500;
    return next(error);
  }
  res.status(200).json({
    mensaje: "Todos los docentes",
    docentes: docentes,
  });
});

// * Listar un docente en concreto
router.get("/:id", async (req, res, next) => {
  const idDocente = req.params.id;
  let docente;
  try {
    docente = await Docente.findById(idDocente);
  } catch (err) {
    const error = new Error(
      "Ha habido algún error. No se han podido recuperar los datos"
    );
    error.code = 500;
    return next(error);
  }
  if (!docente) {
    const error = new Error(
      "No se ha podido encontrar un docente con el id proporcionado"
    );
    error.code = 404;
    return next(error);
  }
  res.json({
    mensaje: "Docente encontrado",
    docente: docente,
  });
});

// * Crear nuevo docente
router.post("/", async (req, res, next) => {
  const { nombre, email, password, cursos, activo } = req.body;
  let existeDocente;
  try {
    existeDocente = await Docente.findOne({
      email: email,
    });
  } catch (err) {
    const error = new Error(err);
    error.code = 500;
    return next(error);
  }

  if (existeDocente) {
    const error = new Error("Ya existe un docente con ese e-mail.");
    error.code = 401; // 401: fallo de autenticación
    return next(error);
  } else {
    const nuevoDocente = new Docente({
      nombre,
      email,
      password,
      cursos,
      activo,
    });
    try {
      await nuevoDocente.save();
    } catch (error) {
      const err = new Error("No se han podido guardar los datos");
      err.code = 500;
      return next(err);
    }
    res.status(201).json({
      docente: nuevoDocente,
    });
  }
});

// * Crear nuevo docente (relacionándolo con Curso)
router.post("/", async (req, res, next) => {
  const { nombre, email, password, activo } = req.body;
  let existeDocente;
  try {
    existeDocente = await Docente.findOne({
      email: email,
    });
  } catch (err) {
    const error = new Error(err);
    error.code = 500;
    return next(error);
  }

  if (existeDocente) {
    const error = new Error("Ya existe un docente con ese e-mail.");
    error.code = 401; // 401: fallo de autenticación
    return next(error);
  } else {
    const nuevoDocente = new Docente({
      nombre,
      email,
      password,
      activo,
      cursos: [],
    });
    try {
      await nuevoDocente.save();
    } catch (error) {
      const err = new Error("No se han podido guardar los datos");
      err.code = 500;
      return next(err);
    }
    res.status(201).json({
      docente: nuevoDocente,
    });
  }
});

// * Modificar datos de un docente
// router.patch('/:id', async (req, res, next) => {
// 	const { nombre, email, password, cursos, activo } = req.body; // ! Recordar: Destructuring del objeto req.body
// 	const idDocente = req.params.id;
// 	let docenteBuscar;
// 	try {
// 		docenteBuscar = await Docente.findById(idDocente); // (1) Localizamos el docente en la BDD
// 	} catch (error) {
// 		const err = new Error(
// 			'Ha habido algún problema. No se ha podido actualizar la información del docente'
// 		);
// 		err.code = 500;
// 		throw err;
// 	}

// 	// (2) Modificamos el docente
// 	docenteBuscar.nombre = nombre;
// 	docenteBuscar.email = email;
// 	docenteBuscar.password = password;
// 	docenteBuscar.cursos = cursos;
// 	docenteBuscar.activo = activo;

// 	try {
// 		docenteBuscar.save(); // (3) Guardamos los datos del docente en la BDD
// 	} catch (error) {
// 		const err = new Error(
// 			'Ha habido algún problema. No se ha podido guardar la información actualizada'
// 		);
// 		err.code = 500;
// 		throw err;
// 	}
// 	res.status(200).json({
// 		mensaje: 'Datos de docente modificados',
// 		docente: docenteBuscar,
// 	});
// });

// * Modificar datos de un docente - Método más efectivo (findByIdAndUpadate)
router.patch("/:id", async (req, res, next) => {
  const idDocente = req.params.id;
  const camposPorCambiar = req.body;
  let docenteBuscar;
  try {
    docenteBuscar = await Docente.findByIdAndUpdate(
      idDocente,
      camposPorCambiar,
      {
        new: true,
        runValidators: true,
      }
    ); // (1) Localizamos y actualizamos a la vez el docente en la BDD
  } catch (error) {
    res.status(404).json({
      mensaje: "No se han podido actualizar los datos del docente",
      error: error.message,
    });
  }
  res.status(200).json({
    mensaje: "Datos de docente modificados",
    docente: docenteBuscar,
  });
});

// * Eliminar un docente
router.delete("/:id", async (req, res, next) => {
  let docente;
  try {
    docente = await Docente.findByIdAndDelete(req.params.id);
  } catch (err) {
    const error = new Error(
      "Ha habido algún error. No se han podido eliminar los datos"
    );
    error.code = 500;
    return next(error);
  }
  res.json({
    mensaje: "Docente eliminado",
    docente: docente,
  });
});

// * Login de docentes
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  let docenteExiste;
  try {
    docenteExiste = await Docente.findOne({
      // (1) Comprobación de email
      email: email,
    });
  } catch (error) {
    const err = new Error(
      "No se ha podido realizar la operación. Pruebe más tarde"
    );
    err.code = 500;
    return next(err);
  }

  if (!docenteExiste || docenteExiste.password !== password) {
    const error = new Error(
      "No se ha podido identificar al docente. Credenciales erróneos"
    ); // (2) El usuario no existe
    error.code = 422; // 422: Datos de usuario inválidos
    return next(error);
  } else {
    res.json({
      mensaje: "Docente logueado", // (3) El usuario existe
    });
  }
});

// * Buscar un docente en función del parámetro de búsqueda
router.get("/buscar/:busca", async (req, res, next) => {
  const search = req.params.busca;
  let docentes;
  try {
    docentes = await Docente.find({
      nombre: { $regex: search, $options: "i" },
    });
  } catch (err) {
    const error = new Error("Ha ocurrido un error en la recuperación de datos");
    error.code = 500;
    return next(error);
  }
  res.status(200).json({ mensaje: "Docentes encontrados", docentes: docentes });
});

module.exports = router;
