const { Pool } = require('pg');
const DbConfig = require('../DbConfig/DbConfig')
class EmpleadoServiceDb extends DbConfig {
  constructor() {
    super()
    this.pool = new Pool(super.getConfig())
  }

  async crearEmpleado(p_nombre, p_apellido, p_especialidad, p_rol_id, p_contrasena, p_email) {
    try {
      console.log(p_nombre, p_apellido, p_especialidad, p_rol_id, p_contrasena, p_email)
      const existeEmpleado = await this.obtenerEmpleadoPorEmail(p_email)
      if (existeEmpleado) {
        console.log('empleado ya existe')
        return false
      } else {
        const result = await this.pool.query(
          `SELECT peluqueria.crear_empleado('${p_nombre}', '${p_apellido}', '${p_especialidad}', '${p_rol_id}', '${p_email}') as nuevo_empleado_id`
        );
        return result.rows[0]
      }
    } catch (error) {
      throw new Error('Error al crear empleado: ' + error.message);
    }
  }
  async obtenerEmpleadoPorEmail(email) {
    try {
      const result = await this.pool.query('SELECT * FROM peluqueria.empleado WHERE "email" = $1', [email]);
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return false;
      }
    } catch (error) {
      throw new Error('Error al crear empleado: ' + error.message);
    }
  }

  async obtenerEmpleados() {
    try {
      const result = await this.pool.query('SELECT * FROM peluqueria.empleado');
      if (!result.rows[0]) {
        return { message: "No existen empleados" }
      }
      return result.rows;
    } catch (error) {
      throw new Error('Error al obtener empleado: ' + error.message);
    }
  }

  async actualizarEmpleado(p_empleado_id, p_nombre, p_apellido, p_especialidad, p_rol_id, p_email) {
    try {
      console.log(p_empleado_id, p_nombre, p_apellido, p_especialidad, p_rol_id, p_email)
      const result = await this.pool.query(
        `SELECT peluqueria.actualizar_empleado('${p_empleado_id}','${p_nombre}','${p_apellido}', '${p_especialidad}', '${p_rol_id}','${p_email}') as empleado_id_actualizado`
      );
      return { 'se actualizo el empleado': result.rows[0] }
    } catch (error) {
      throw new Error('Error al actualizar empleado: ' + error.message);
    }
  }

  async eliminarEmpleado(empleadoId) {
    try {
      const result = await this.pool.query(`SELECT peluqueria.eliminar_empleado('${empleadoId}') as empleado_eliminado_id`);
      return result.rows[0]
    } catch (error) {
      throw new Error('Error al eliminar empleado: ' + error.message);
    }
  }
}

module.exports = EmpleadoServiceDb;

