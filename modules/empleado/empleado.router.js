const express = require('express');
const router = express.Router();
const {crearEmpleado, obtenerEmpleados, actualizarEmpleadoPorId, eliminarEmpleadoPorID } = require("./empleado.controller")


router.post('/', async (req, res) => {
  crearEmpleado(req, res)
  .catch(error => {
    res.status(500).json({ message: error.message });
  })
});
router.get('/', (req, res) => {
  obtenerEmpleados(req, res)
  .catch(error => {
      res.status(500).json({message: error.message })
  })
})
router.patch('/:p_empleado_id', (req, res) => {
  actualizarEmpleadoPorId(req, res)
  .catch(error => {
      res.status(500).json({message: error.message })
  })
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await empleadoService.findOne(id);
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:empleadoId', async (req, res) => {
  eliminarEmpleadoPorID(req, res)
  .catch( error => {
    console.log(error)
    res.status(500).send("server error")
  })
});



module.exports = router;
