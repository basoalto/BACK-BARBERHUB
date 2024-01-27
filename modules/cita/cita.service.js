const { Pool } = require('pg');
require('dotenv').config();
const DbConfig = require('../../DbConfig/DbConfig')
const messageCreateDateTemplate = require('../mail/template/mail')
const MailService = require('../mail/mail.service')
class CitaService extends DbConfig {

  constructor(){
    super()
    this.pool =  new Pool(super.getConfig())
    this.mailService = new MailService;
  }
  async CrearCita(p_Fecha, p_HoraEntrada, p_HoraSalida, ImagenCorte, p_Estado, p_clienteID, p_empleadoID, p_servicioID, p_email) {
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

      const message = messageCreateDateTemplate(p_email, p_Fecha,`${p_HoraEntrada} a ${p_HoraSalida}`)
      const responseEmail = this.mailService.sendMail(message)
      console.log(responseEmail)
      return true;
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

  async actualizarCita(p_idCita,p_Fecha, p_HoraInicio, p_HoraFin, p_ClienteID, p_EmpleadoID, p_ServicioID, p_Estado){
    try{
      console.log(p_idCita,p_Fecha, p_HoraInicio, p_HoraFin, p_ClienteID, p_EmpleadoID, p_ServicioID, p_Estado)
      const result = await this.pool.query(`SELECT peluqueria.actualizar_cita(${p_idCita},'${p_Fecha}','${p_HoraInicio}','${p_HoraFin}',${p_ClienteID},${p_EmpleadoID},${p_ServicioID},'${p_Estado}') as cita_id_actualizado`)
      if(result.rows.length > 0){
        console.log(result.rows.length)
        return result.rows[0]
      }else{
        return false
      }
    }catch(error){
      console.log(error)
      throw new Error("error al actualizar cita", error.message)
    }
  }
}



module.exports = CitaService;



