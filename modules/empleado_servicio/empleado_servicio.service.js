const EmpleadoServicioDb = require('../../database/empleado_servicioQuery.database')

class EmpleadoServicio extends EmpleadoServicioDb{
  constructor(){
    super()
  }

  async crearEmpleadoServicio(p_empleadoID, p_servicioID) {
    console.log(p_empleadoID, p_servicioID)
    const response = await super.crear(p_empleadoID, p_servicioID)
    if(!response){
      return {message: "El servicio ya existe para el empleado"}
    }else{
      return response
    }
  }

  async obtenerServicioEmpleado(empleadoId){
    const response = await super.obtenerServicioPorIdEmpleado(empleadoId)
    if(!response){
      return {message: 'No existen servicios con este id empleado'}
    }else{
      return response
    }
  }

}

module.exports = EmpleadoServicio
