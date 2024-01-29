const { Pool } = require('pg');
require('dotenv').config();
const empleadoTurnoDB = require('../../database/empleado_turnoQuery.database')

class Empleado_TurnoService extends empleadoTurnoDB {
  constructor() {
    super()
    this.pool = new Pool(super.getConfig())
  }

  async crearEmpleado_turno(p_idEmpleado, p_Fecha, p_HoraEntrada, p_HoraSalida, p_nombre) {
    try {
      const response = super.crearEmpleado_turno(p_idEmpleado, p_Fecha, p_HoraEntrada, p_HoraSalida, p_nombre)
      return response
      }
      catch (error) {
        throw new Error('Error al crear turno del empleado: ' + error.message);
      }
  }

  async obtenerTurnoPorId(idEmpleado) {
    try {
      const response = super.obtenerTurnoPorId(idEmpleado)
      if (response) {
        return response
      } else {
        return false;
      }
    } catch (error) {
      throw new Error('Error al crear empleado: ' + error.message);
    }
  }

  async actualizarEmpleado(p_empleado_id, p_fecha, p_hora_entrada, p_hora_salida, p_nombre) {
    try {
      const response = super.actualizarEmpleado(p_empleado_id, p_fecha, p_hora_entrada, p_hora_salida, p_nombre)
      return response
    } catch (error) {
      throw new Error('Error al actualizar empleado: ' + error.message);
    }
  }
  async deleteEmpleadoTurno(p_empleadoTurno_id) {
    try {
      const response = super.deleteEmpleadoTurno(p_empleadoTurno_id)
      if(response){
        return response
      }else{
        return false
      }
    } catch (error) {
      throw new Error('Error al eliminar empleado_turno: ' + error.message);
    }
  }
}

module.exports = Empleado_TurnoService;
