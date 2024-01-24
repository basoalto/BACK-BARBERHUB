const { boolean } = require('joi');
const Empleado_TurnoService = require('./empleado_turno.service');

const service = new Empleado_TurnoService();


const crearEmpleado_turno = async (req, res) => {
  try {
    const { EmpleadoID, Fecha, HoraEntrada, HoraSalida, Nombre} = req.body;
    console.log(Nombre)
    const response =  await service.crearEmpleado_turno(EmpleadoID, Fecha, HoraEntrada, HoraSalida, Nombre)
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

const obtenerturno = async(req, res) => {
  try{
    const { empleadoId } = req.params
    const response = await service.obtenerTurnoPorId(empleadoId)
    res.status(200).send(response)
  }catch(error){
    console.log(error)
    res.status(500).json({ error: error.message });
  }
}

const ActualizarTurnoPorIdEmpleado = async (req, res) => {
  try {
    const { empleadoId } = req.params;
    const { Fecha = "1800-01-01", HoraEntrada = "00:00:00", HoraSalida = "00:00:00", Nombre= '' } = req.body;
    const response = service.actualizarEmpleado(empleadoId, Fecha, HoraEntrada, HoraSalida, Nombre);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const EliminarTurnoPorIdTurno = async (req, res) => {
  try {
    const { IdTurno  } = req.params;
    const response = await service.deleteEmpleadoTurno(IdTurno);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {crearEmpleado_turno, obtenerturno, ActualizarTurnoPorIdEmpleado, EliminarTurnoPorIdTurno};
