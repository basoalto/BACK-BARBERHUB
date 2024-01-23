const { Pool } = require('pg');
const DbConfig = require('../DbConfig/DbConfig')

class citaQuery extends DbConfig {
  constructor(){
    super()
    this.Pool = new Pool(super.getConfig())
  }
}


module.exports = citaQuery;
