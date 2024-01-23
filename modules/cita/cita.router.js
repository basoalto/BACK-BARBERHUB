const express = require('express');
const router = express.Router();
const { crearCita, obtenerCitaPorIdEmpleado } = require('./cita.controller');
const multer = require('multer');

// Configuración del middleware de carga de archivos con Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('p_ImagenCorte'), async (req, res) => {
  try {
    await crearCita(req, res);
  } catch (error) {
    console.log("error server", error);
    res.status(500).send("error server");
  }
});


router.get('/:idEmpleado', (req, res) => {
  obtenerCitaPorIdEmpleado(req, res)
  .catch((error) => {
    console.log(error)
    res.status(500).send('Error Server')
  })
})

module.exports = router;
