const ClienteService = require('./cliente.service')

const service = new ClienteService


const crearCliente = async (req, res) => {
  try{
    const {
      contrasena,
      p_nombre,
      p_apellido,
      p_telefono,
      p_email,
      p_rol_id } = req.body;
    const response = await service.crearCliente(contrasena, p_nombre, p_apellido, p_telefono, p_email, p_rol_id)
    console.log(response)
    res.status(200).send(response)
  }catch(error){
    res.status(404).send('Bad Request')
  }
}

const obtenerClientes = async (req, res) =>{
  try{
    const response = await service.obtenerClientes()
    res.status(200).send(response)
  }catch(error){
    console.log(error)
    res.status(404).send("Bad Request")
  }
}

const actualizarCliente = async (req, res) => {
  try{
    const { p_clienteid } = req.params
    const {
        p_nombre= '',
        p_apellido= '',
        p_telefono= '',
        p_email= '',
        p_rol= 1,
        p_estado= null} = req.body
    const response = await service.actualizarCliente(p_clienteid, p_nombre, p_apellido,p_telefono, p_email, p_rol, p_estado)
    if(!response){
      res.status(404).send("Cliente no existe")
    }
    res.status(200).send(response)
  }catch(error){
    console.log(error)
    res.status(404).send('Bad Request')
  }
}


module.exports = {crearCliente, obtenerClientes, actualizarCliente}
