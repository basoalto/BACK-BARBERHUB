const { extend } = require('joi')
const adminQuery = require('../../database/adminQuery.database')


class AdminService extends adminQuery{
  constructor(){
    super()
  }

  async obtenerAdminPorCorreo(correo){
    const response = await this.obtenerAdmin(correo)
    if(response){
      console.log(response)
      return response
    }else{
      return false
    }
  }
}

module.exports = AdminService
