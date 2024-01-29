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



class AuthService {
  constructor(){}


  async singIn(correo, contrasena){
    let token = '';
    const userRecord = await firebaseService.signIn(correo, contrasena);
    console.log(userRecord);
    const cliente = await clienteService.obtenerClientePorEmail(correo);
    const empleado = await empleadoServiceDb.obtenerEmpleadoPorEmail(correo);
    const admin = await adminService.obtenerAdmin(correo)

    if (userRecord && cliente.Estado == true) {
      token = createJwt(cliente);
      return token
    } else if (userRecord && empleado.Estado == true) {
      token = createJwt(empleado);
      return token
    }else if (userRecord && admin) {
      token = createJwt(admin);
      return token
    }else{
      return false
    }
  }

  async resetPassword(email){
    try{
      const userRecord = await firebaseService.restorePassword(email)
      if(userRecord){
        return true
      }else{
        return false
      }
    } catch (error) {
      console.error('Error user:', error );
    }
  }

}


module.exports= AuthService
