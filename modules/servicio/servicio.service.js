const { Pool } = require('pg');
const { auth, createUserWithEmailAndPassword, getUserByEmail, deleteUser } = require('../../firebase/config');
require('dotenv').config();
const DbConfig = require('../../DbConfig/DbConfig')

class ServicioService extends DbConfig{
  constructor(){
    super()
    this.pool = new Pool(super.getConfig())
  }

  async obtenerServicios () {
    try{
      const result = await this.pool.query('SELECT * FROM peluqueria.servicio')
      if(!result.rows[0]){
        return {message: 'no existen servicios'}
      }
      return result.rows
    }catch(error){
      throw new Error('Error al obtener empleado: ' + error.message);
    }
  }

  async obtenerServicioPorIdservicio (servicioID) {
    try{
      const result = await this.pool.query('SELECT * FROM peluqueria.servicio WHERE "ServicioID" = $1', [servicioID])
      if(!result.rows[0]){
        return {message: 'no existen servicios'}
      }
      return result.rows[0]
    }catch(error){
      throw new Error('Error al obtener empleado: ' + error.message);
    }
  }

}
module.exports = ServicioService;
