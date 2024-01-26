const mailConectionConfig = require('../../mailConfig/mailer')

class MailService {
  constructor(){
    this.mailer =  mailConectionConfig;
  }

  async sendMail(message) {
    console.log(message)
    try {
      this.mailer.sendMail(message, (error, info) => {
        if (error) {
          console.log("Error enviando email");
          console.log(error.message);
        } else {
          console.log("Email enviado");
          console.log(info);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}


module.exports = MailService
