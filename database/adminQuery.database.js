const { Pool } = require('pg');
const DbConfig = require('../DbConfig/DbConfig')

class adminQuery extends DbConfig {
  constructor(){
    super()
    this.pool = new Pool(super.getConfig())
  }

  async obtenerAdmin(correo) {
    try {
        console.log(correo)
        const result = await this.pool.query(
          'SELECT * FROM peluqueria.admin WHERE "Email" = $1', [correo]);
        if (result.rows.length > 0) {
          return result.rows[0]
        }else{
          return false
        }
    }catch(error) {
      throw new Error('Error al obtener admin: ' + error.message);
    }
  }
}



module.exports = adminQuery;
