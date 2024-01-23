const ClienteService = require('./cliente.service')

const service = new ClienteService


const crearCliente = async (req, res) => {
  try{
    const { contrasena, p_nombre, p_apellido, p_telefono, p_email, p_rol_id } = req.body;
    const response = await service.crearCliente(contrasena, p_nombre, p_apellido, p_telefono, p_email, p_rol_id)
    console.log(response)
    res.status(200).send(response)
  }catch(error){
    res.status(404).send('Bad Request')
  }
}




module.exports = crearCliente
