const { Pool } = require('pg');
const { createUserWithEmailAndPassword } = require('../../firebase/config');
const DbConfig = require('../../DbConfig/DbConfig')
const FirebaseService = require('../../firebase/firebase')

const firebaseService = new FirebaseService

class ClienteService extends DbConfig {
  constructor() {
    super()
    // Configuración de conexión a la base de datos
    this.pool = new Pool(super.getConfig())
  }

  async crearCliente(contrasena, p_nombre, p_apellido, p_telefono,p_email, p_rol_id) {
    try {
      console.log('rol', p_rol_id)
      const responseEmailCliente = await this.obtenerClientePorEmail(p_email)
      console.log(responseEmailCliente)
      if(responseEmailCliente){
        return {message: 'cliente existe'}
      }else{
        // Crear cliente en la base de datos
        const result = await this.pool.query(
          `SELECT peluqueria.crear_cliente('${p_nombre}', '${p_apellido}', '${p_telefono}', '${p_email}', '${p_rol_id}') as nuevo_cliente_id`);
        console.log('Response from crearCliente:', responseEmailCliente);

        const userRecord = await firebaseService.register(p_email, contrasena);
        console.log(userRecord.user.uid)
        return {"user creado": userRecord.user.uid}
      }
    } catch (error) {
      console.log(error)
      throw new Error('Error al crear cliente: ' + error.message);
    }
  }
  async obtenerClientes() {
    try{
      const result = await this.pool.query('SELECT * FROM peluqueria.cliente');
      if(!result.rows[0]){
        return {message: "No existen clientes"}
      }
      return result.rows;
    }catch(error){
      throw new Error('no existen clientes');
    }
  }

  async obtenerClientePorEmail(email) {
    try {
      const result = await this.pool.query('SELECT * FROM peluqueria.cliente WHERE "Email" = $1', [email]);
      if(result.rows.length > 0){
        console.log(result.rows[0])
        return result.rows[0]
      }
      else{
        return false
      };
    } catch (error) {
      throw new Error('error al crear cliente' + error.message);
    }
  }
}
module.exports = ClienteService;
