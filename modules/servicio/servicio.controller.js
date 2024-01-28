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

const obtenerServiciosPorIdServicio = async (req, res)=> {
  try{
    const {idServicio } = req.params
    console.log(idServicio)
    const response = await service.obtenerServicioPorIdservicio(idServicio)
    res.status(200).send(response)
  }catch(error){
    res.status(404).send('Bad Request')
  }
}




module.exports = {obtenerServicios, obtenerServiciosPorIdServicio}
