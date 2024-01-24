const { Pool } = require('pg');
const DbConfig = require('../DbConfig/DbConfig')
class EmpleadoServicioDb extends DbConfig {
  constructor() {
    super()
    this.pool = new Pool(super.getConfig())
  }
  async crear(p_empleadoID, p_servicioID){
    try{
      const responseIdServicio = await this.obtenerPorIdServicio(p_empleadoID, p_servicioID)
      console.log(responseIdServicio)
      if(!responseIdServicio){
        return false
      }
      console.log(p_empleadoID, p_servicioID)
      const result = await this.pool.query(`SELECT peluqueria.crearEmpleado_Servicio('${p_empleadoID}', '${p_servicioID}') as nuevo_empleado_servicio`)
      return result.rows[0]
    }catch(error){
      console.log(error)
      throw new Error('error al crear empleado', error)
    }
  }
  async obtenerPorIdServicio(p_empleadoID, idServicio){
    try{
      const result = await this.pool.query('SELECT * FROM peluqueria.empleado_servicio WHERE "ServicioID" = $1 AND "EmpleadoID" = $2', [idServicio, p_empleadoID]);
      if(result.rows.length > 0){
        return false
      }else{
        return result.rows[0]
      }
    }catch(error){
      throw new Error('no se pudo obtener el Empleado_servicio por id', error)
    }
  }
}

module.exports = EmpleadoServicioDb
