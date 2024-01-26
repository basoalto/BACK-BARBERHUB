const CitaService = require("./cita.service");

const service = new CitaService();

const crearCita = async (req, res) => {
  try {
    const { p_Fecha, p_HoraEntrada, p_HoraSalida, p_Estado, p_clienteID,p_empleadoID, p_servicioID, p_email  } = req.body;
    if (!req.file) {
      return res.status(400).send("No se proporcionó ninguna imagen");
    }

    const file = req.file;
    const base64Image = file.buffer.toString('base64'); // Convierte el buffer a una cadena base64
    const response = await service.CrearCita(
      p_Fecha,
      p_HoraEntrada,
      p_HoraSalida,
      base64Image,
      p_Estado,
      p_clienteID,
      p_empleadoID,
      p_servicioID,
      p_email
    );
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(404).send("Bad Request");
  }
};

const obtenerCitaPorIdEmpleado = async (req, res) => {
  try{
    const { idEmpleado } = req.params
    const response = await service.obtenerCitaPorIdEmpleado(idEmpleado)
    res.status(200).send(response)
  }catch{
    res.status(404).send("Bad Request")
  }
}

module.exports = { crearCita, obtenerCitaPorIdEmpleado };
