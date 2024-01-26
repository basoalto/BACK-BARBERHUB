const express = require('express')

const empleado = require('../modules/empleado/empleado.router')
const auth = require('../modules/auth/auth.router')
const cliente = require('../modules/cliente/cliente.router')
const servicio = require('../modules/servicio/servicio.router')
const empleado_turno = require('../modules/empleado_turno/empleado_turno.router')
const cita = require('../modules/cita/cita.router')
const cors = require('cors');
const empleado_servicio = require('../modules/./empleado_servicio/empleado_servicio.router')
const sendEmail =  require('../modules/mail/mail.router')
function routerApi(app){
  const router = express.Router();
  app.use(cors());
  app.use('/api/v1', router)
  router.use('/empleado', empleado)
  router.use('/empleado_turno', empleado_turno)
  router.use('/auth', auth)
  router.use('/cliente', cliente)
  router.use('/servicio', servicio)
  router.use('/cita', cita)
  router.use('/empleado_servicio', empleado_servicio)
  router.use('/sendEmail', sendEmail)
}

module.exports = routerApi;
