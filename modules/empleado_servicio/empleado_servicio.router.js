const express = require('express');
const router = express.Router();
const {crearEmpleado_Service}  = require("./empleado_serviceio.controller")

router.post('/', async (req, res) => {
  crearEmpleado_Service(req, res)
  .catch(error => {
    res.status(500).json({ message: error.message });
  })
});


module.exports = router;
