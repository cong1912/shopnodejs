const nodemailer = require('nodemailer');

const sendEmail = options => {
  //1) create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
    // Acticate in gmail 'less secure app" option
  });

  //2) define the email options
  const mailOptions = {
    from: 'Công admin <dangcong1810@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  //3) actually send the email
  transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
