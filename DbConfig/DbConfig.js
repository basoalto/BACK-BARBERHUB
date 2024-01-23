class DbConfig {
  constructor(){
    this.user= process.env.PG_USER,
    this.host= process.env.PG_HOST,
    this.database= process.env.PG_DATABASE,
    this.password= process.env.PG_PASSWORD,
    this.port= process.env.PG_PORT,
    this.ssl= {
      rejectUnauthorized: process.env.PG_SSL_REJECT_UNAUTHORIZED === 'true',
    };
  }


  getConfig(){
    return {
      user: this.user,
      host: this.host,
      database: this.database,
      password: this.password,
      port: this.port,
      ssl: this.ssl
    }
  }
}


module.exports = DbConfig;
