const EmpleadoServicio = require('./empleado_servicio.service');

const service = new EmpleadoServicio



const crearEmpleado_Service = async (req, res) => {
  try{
    const {p_empleadoID, p_servicioID  } = req.body

    const response = await service.crearEmpleadoServicio(p_empleadoID, p_servicioID)
    console.log(response)
    res.status(200).send(response)
  }catch(error){
    res.status(404).send("Bad Request")
  }
}





module.exports = {crearEmpleado_Service}
