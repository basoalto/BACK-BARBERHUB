const ServicioService = require("./servicio.service")

const service = new ServicioService

const obtenerServicios = async (req, res) => {
  try{
    const response = await service.obtenerServicios()
    return res.status(200).send(response)
  }catch(error){
    console.log(error)
    res.status(404).send('Bad Request')
  }

}


module.exports = obtenerServicios
