const express = require('express');
const router = express.Router();
const ClienteService = require('../cliente/cliente.service.js')
const EmpleadoServiceDb = require('../../database/empleadoQuery.database')
const obtenerAdmin = require('../../database/adminQuery.database.js')
const FirebaseService = require('../../firebase/firebase')
const {createJwt} = require('../../util/jwt.js')

const adminService = new obtenerAdmin
const clienteService = new ClienteService
const empleadoServiceDb = new EmpleadoServiceDb
const firebaseService = new FirebaseService


router.post('/signin', async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    console.log(correo, contrasena);
    let token = '';
    const userRecord = await firebaseService.signIn(correo, contrasena);
    console.log(userRecord);
    const cliente = await clienteService.obtenerClientePorEmail(correo);
    const empleado = await empleadoServiceDb.obtenerEmpleadoPorEmail(correo);
    const admin = await adminService.obtenerAdmin(correo)
    console.log(admin)
    if (cliente) {
      console.log(cliente);
      token = createJwt(cliente);
    } else if (empleado) {
      console.log(empleado);
      token = createJwt(empleado);
    }else if (admin) {
      console.log(admin);
      token = createJwt(admin);
    }
    // Enviar el token JWT como respuesta al cliente
    res.status(200).json(token);
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(404).json({ error: 'No existe el usuario' });
  }
});



router.post('/resetpassword', async (req, res) => {
  try{
    const {correo} = req.body;
    console.log(correo)
    const userRecord = await firebaseService.restorePassword(correo)
    res.status(200).json({ response: 'email enviado para restablacer clave' });
  } catch (error) {
    console.error('Error registering user:', error );
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = router;
