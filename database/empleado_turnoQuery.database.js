const { Pool } = require('pg');
require('dotenv').config();
const DbConfig = require('../DbConfig/DbConfig')

class empleadoTurnoDB extends DbConfig{
  constructor(){
    super()
    this.pool = new Pool(super.getConfig())
  }

  async crearEmpleado_turno(p_idEmpleado, p_Fecha, p_HoraEntrada, p_HoraSalida, p_nombre) {
    try {
      const result = await this.pool.query(
        `SELECT peluqueria.crear_empleado_turno(${p_idEmpleado}, '${p_Fecha}', '${p_HoraEntrada}', '${p_HoraSalida}','${p_nombre}') as nuevo_turno_id`
        );
      console.log(result)
      return result.rows[0]
      }
      catch (error) {
        throw new Error('Error al crear turno del empleado: ' + error.message);
      }
  }

  async obtenerTurnoPorId(idEmpleado) {
    try {
      console.log('id',idEmpleado)
      const result = await this.pool.query('SELECT * FROM peluqueria.empleado_turno WHERE "EmpleadoID" = $1', [idEmpleado]);
      if (result.rows.length > 0) {
        return result.rows;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error('Error al crear empleado: ' + error.message);
    }
  }
  async actualizarEmpleado(p_turno_id, p_fecha, p_hora_entrada, p_hora_salida, p_nombre) {
    try {
      console.log(p_turno_id, p_fecha, p_hora_entrada, p_hora_salida, p_nombre)
      const result = await this.pool.query(
        `SELECT peluqueria.actualizar_empleado_turno(${p_turno_id},'${p_fecha}','${p_hora_entrada}','${p_hora_salida}', '${p_nombre}') as empleado_turno_id_actualizado`
      );
      return {'se actualizo el turno del empleado': result.rows[0]}
    } catch (error) {
      throw new Error('Error al actualizar turno: ' + error.message);
    }
  }
  async deleteEmpleadoTurno(p_empleadoTurno_id) {
    try {
      const result = await this.pool.query(
        `DELETE FROM peluqueria.empleado_turno WHERE empleado_turnoid = $1 RETURNING empleado_turnoid;`,
        [p_empleadoTurno_id]
      );
      if(result.rows.length > 0){
        console.log(result.rows)
        return { 'se elimino el turno del empleado': result.rows[0] };
      }else{
        console.log(result.rows)
        return { message: 'No existe el id de turno'};
      }

    } catch (error) {
      throw new Error('Error al eliminar empleado_turno: ' + error.message);
    }
  }
}



module.exports =empleadoTurnoDB
