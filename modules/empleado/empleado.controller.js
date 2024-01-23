const EmpleadoService = require('./empleado.service');

const empleadoService = new EmpleadoService();



const crearEmpleado = async (req, res) => {
  try {
    const { p_nombre, p_apellido, p_especialidad, p_rol_id, p_contrasena, p_email} = req.body;

    const response =  await empleadoService.crearEmpleado(p_nombre, p_apellido, p_especialidad, p_rol_id, p_contrasena, p_email)
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};
const obtenerEmpleados = async (req, res) => {
  try{
    const response = await empleadoService.obtenerEmpleados()
    console.log('controler', response)
    res.status(200).json(response)
  }catch{
    res.status(404).json({ error: error.message });
  }

}

const actualizarEmpleadoPorId = async (req, res) => {
  try {
    const { p_empleado_id } = req.params;
    console.log(p_empleado_id);

    const {
      p_nombre = '',
      p_apellido = '',
      p_especialidad = '',
      p_rol_id = 2,
      p_email = ''
    } = req.body;

    const response = await empleadoService.actualizarEmpleado(p_empleado_id, p_nombre, p_apellido, p_especialidad, p_rol_id, p_email);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error al actualizar empleado:', error.message);
    res.status(404).json({ error: error.message });
  }
}

const eliminarEmpleadoPorID = async (req, res) => {
  try{
    const { correo } = req.body
    const {empleadoId} = req.params
    const response = await empleadoService.eliminarEmpleado(empleadoId, correo)
    res.status(200).send(response)
  }catch(error){
    res.status(404).json({error: error.message})
  }
}




module.exports = { crearEmpleado, obtenerEmpleados, actualizarEmpleadoPorId, eliminarEmpleadoPorID};
