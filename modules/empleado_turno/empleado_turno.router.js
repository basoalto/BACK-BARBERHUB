const express = require('express');
const router = express.Router();
const {crearEmpleado_turno, obtenerturno, ActualizarTurnoPorIdEmpleado, EliminarTurnoPorIdTurno}  = require("./empleado_turno.controller")

router.post('/', async (req, res) => {
  crearEmpleado_turno(req, res)
  .catch(error => {
    res.status(500).json({ message: error.message });
  })
});

router.get('/:empleadoId', async (req, res) => {
  obtenerturno(req, res)
  .catch(error => {
    res.status(500).json({ message: error.message });
  })
});

router.patch('/:empleadoId', async (req, res) => {
  ActualizarTurnoPorIdEmpleado(req, res)
  .catch(error => {
    res.status(500).json({ message: error.message });
  })
});
router.delete('/:IdTurno', async (req, res) => {
  EliminarTurnoPorIdTurno(req, res)
  .catch(error => {
    res.status(500).json({ message: error.message });
  })
});


module.exports = router;
