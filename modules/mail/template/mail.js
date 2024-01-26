const messageCreateDateTemplate = (mail, date, time) => {
  return {
      from: "vetsflyfly@gmail.com",
      to: mail,
      subject: "Creacion de su cita",
      text: `"Estimado(a) .Usted ha reservado exitosamente una hora, para el día ${date} a las ${time} hrs."`,
      // html: "<p>Se aproxima su cita, por favor no olvide asistir</p>"
  }
};

module.exports = messageCreateDateTemplate
