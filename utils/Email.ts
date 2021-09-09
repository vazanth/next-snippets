import nodemailer from 'nodemailer';

export const sendMail_mdlr = ({
  html,
  subject,
  to,
}: {
  to: string[];
  subject: string;
  html: string;
}) => {
  console.log(to, subject, html);
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    transporter.sendMail({
      from: process.env.MAIL_FROM || 'admin@snippest.io',
      priority: 'high',
      to,
      subject,
      html,
    });
  } catch (err) {
    console.log('error-mail', err.message);
    throw err;
  }
};
