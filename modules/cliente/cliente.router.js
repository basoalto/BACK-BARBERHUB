const express = require('express');
const router = express.Router();
const  {crearCliente, obtenerClientes}  = require("./cliente.controller")

router.post('/registerCliente', async (req, res) => {
  crearCliente(req, res)
  .catch((error)=> {
    console.log(error)
    res.status(500).send('server error')
  })
});



router.get('/', (req, res)=>{
  obtenerClientes(req, res)
  .catch((error) => {
    console.log(error)
    res.status(500).send("Server Error")
  })
})

module.exports = router;
