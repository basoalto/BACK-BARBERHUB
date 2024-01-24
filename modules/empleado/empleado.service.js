const { Pool } = require('pg');
const { createUserWithEmailAndPassword, deleteUser } = require("firebase/auth");
const FirebaseService = require('../../firebase/firebase')
const EmpleadoServiceDb = require('../../database/empleadoQuery.database')

const firebaseService = new FirebaseService
class QueryEmpleado extends EmpleadoServiceDb{
  constructor(){
    super()
  }

  async crearEmpleado(p_nombre, p_apellido, p_especialidad, p_rol_id, p_contrasena, p_email) {
    try {
        const response = await super.crearEmpleado(p_nombre, p_apellido, p_especialidad, p_rol_id, p_contrasena, p_email)
        if(!response){
          return {message: 'ya existe el empleado'}
        }else{
          const userRecord = await firebaseService.register(p_email, p_contrasena);
          return userRecord.user.uid;
        }
    }catch (error) {
      throw new Error('Error al crear empleado: ' + error.message);
    }
  }

  async obtenerEmpleados() {
    return super.obtenerEmpleados()
  }

  async actualizarEmpleado(p_empleado_id, p_nombre, p_apellido, p_especialidad, p_rol_id, p_email) {
    return super.actualizarEmpleado(p_empleado_id, p_nombre, p_apellido, p_especialidad, p_rol_id, p_email)
  }

  async eliminarEmpleado(empleadoId, email) {
    try {
      const reponse = await firebaseService.deleteByEmail(email)
      const responsedb = await super.eliminarEmpleado(empleadoId)
      console.log(responsedb)
      return {message: reponse}
    } catch (error) {
      throw new Error('Error al eliminar empleado: ' + error.message);
    }
  }
}



module.exports = QueryEmpleado;
