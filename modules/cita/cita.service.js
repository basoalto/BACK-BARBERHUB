const { Pool } = require('pg');
require('dotenv').config();
const DbConfig = require('../../DbConfig/DbConfig')


class CitaService extends DbConfig {

  constructor(){
    super()
    this.pool =  new Pool(super.getConfig())
  }
  async CrearCita(p_Fecha, p_HoraEntrada, p_HoraSalida, ImagenCorte, p_Estado, p_clienteID, p_empleadoID, p_servicioID) {
    try {
      const p_ImagenCorte = Buffer.from(ImagenCorte, 'base64'); // Decodifica la cadena base64 a un buffer
      console.log(p_ImagenCorte);

      const result = await this.pool.query(
        'SELECT peluqueria.crearcita($1, $2, $3, $4, $5, $6, $7, $8) as nueva_cita',
        [
          p_Fecha,
          p_HoraEntrada,
          p_HoraSalida,
          p_ImagenCorte,
          p_Estado,
          p_clienteID,
          p_empleadoID,
          p_servicioID
        ]
      );

      if (!result.rows[0]) {
        return { message: 'no se creo la cita' };
      }
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error('Error al crear empleao: ' + error.message);
    }
  }


  async obtenerCitaPorIdEmpleado(idEmpleado){
    try{
      const result = await this.pool.query('SELECT * FROM peluqueria.cita WHERE "EmpleadoID" = $1', [idEmpleado])
      if(!result.rows[0]){
        return {message: 'No existe empleado con ese id'}
      }else{
        return result.rows
      }
    }catch(error){
      throw new Error('Error al obtener empleado' + error.message)
    }
  }


}



module.exports = CitaService;



