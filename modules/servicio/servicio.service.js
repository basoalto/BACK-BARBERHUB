const { Pool } = require('pg');
require('dotenv').config();
const ServicioServiceDB = require('../../database/servicioQuery.database')
class ServicioService extends ServicioServiceDB{
  constructor(){
    super()
  }

  async obtenerServicios () {
    try{
      const response = super.obtenerServicios()
      return response
    }catch(error){
      throw new Error('Error al obtener servicios: ' + error.message);
    }
  }

  async obtenerServicioPorIdservicio (servicioID) {
    try{
      const response = super.obtenerServicioPorIdservicio(servicioID)
      return response
    }catch(error){
      throw new Error('Error al obtener servicio: ' + error.message);
    }
  }

}
module.exports = ServicioService;
