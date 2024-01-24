const { Pool } = require('pg');
require('dotenv').config();
const DbConfig = require('../../DbConfig/DbConfig')

class Empleado_TurnoService extends DbConfig {
  constructor() {
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
  async actualizarEmpleado(p_empleado_id, p_fecha, p_hora_entrada, p_hora_salida, p_nombre) {
    try {
      console.log(p_empleado_id, p_fecha, p_hora_entrada, p_hora_salida, p_nombre)
      const result = await this.pool.query(
        `SELECT peluqueria.actualizar_empleado_turno(${p_empleado_id},'${p_fecha}','${p_hora_entrada}','${p_hora_salida}', '${p_nombre}') as empleado_turno_id_actualizado`
      );
      return {'se actualizo el turno del empleado': result.rows[0]}
    } catch (error) {
      throw new Error('Error al actualizar empleado: ' + error.message);
    }
  }
}

module.exports = Empleado_TurnoService;
