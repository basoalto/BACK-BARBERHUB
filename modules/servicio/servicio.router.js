const express = require('express');
const router = express.Router();
const {obtenerServicios, obtenerServiciosPorIdServicio} = require('./servicio.controller')

router.get('/', (req, res) => {
  obtenerServicios(req, res)
  .catch(error => {
      res.status(500).json({message: error.message })
  })
})

router.get('/:idServicio', (req, res) => {
  obtenerServiciosPorIdServicio(req, res)
  .catch(error => {
      res.status(500).json({message: error.message })
  })
})



module.exports = router;
