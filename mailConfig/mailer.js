const nodemailer =  require("nodemailer");

const mailConnectionConfig = nodemailer.createTransport({
  // service: "gmail",
  host: process.env.MAILER_HOST,
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD,
  },
  tls: {
    // Disable certificate validation
    rejectUnauthorized: false,
  },
});

module.exports= mailConnectionConfig;
