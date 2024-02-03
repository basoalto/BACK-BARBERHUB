const { Pool } = require('pg');
const { createUserWithEmailAndPassword } = require('../../firebase/config');
const ClienteServiceDB = require('../../database/clienteQuery.database')
const FirebaseService = require('../../firebase/firebase')

const firebaseService = new FirebaseService

class ClienteService extends ClienteServiceDB {
  constructor() {
    super()
  }

  async crearCliente(contrasena, p_nombre, p_apellido, p_telefono,p_email, p_rol_id, p_estado) {
    try {
        const response = super.crearCliente(contrasena, p_nombre, p_apellido, p_telefono,p_email, p_rol_id, p_estado)
        return response
      }catch (error) {
      console.log(error)
      throw new Error('Error al crear cliente: ' + error.message);
    }
  }
  async obtenerClientes() {
    try{
      return super.obtenerClientes()
    }catch(error){
      throw new Error('no existen clientes');
    }
  }

  async obtenerClientePorEmail(email) {
    try {
      const response = super.obtenerClientePorEmail(email)
      return response
    } catch (error) {
      throw new Error('error al crear cliente' + error.message);
    }
  }

  async actualizarCliente(p_cliente_id, p_nombre, p_apellido,p_telefono, p_email, p_rol, p_estado){
    try{
      const response = super.actualizarCliente(p_cliente_id, p_nombre, p_apellido,p_telefono, p_email, p_rol, p_estado)
      return response
    }catch(error){
      throw new Error("error al crear cliente" + error.message)
    }
  }
}
module.exports = ClienteService;
