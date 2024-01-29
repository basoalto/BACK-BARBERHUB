const express = require('express');
const router = express.Router();
const {signIn, resetPassword} = require('./auth.controller')

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
  signIn(req, res)
  .catch((error) => {
    console.log(error)
    res.status(500).send('Server Error')
  })
});


router.post('/resetpassword', async (req, res) => {
  resetPassword(req, res)
  .catch((error)=> {
    console.log(error)
    res.status(500).send('Server Error')
  })
})

module.exports = router;
