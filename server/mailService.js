import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config()
const trOptions = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
}
const transporter = nodemailer.createTransport(trOptions)
const sendActicvationMail = async (to, link) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: "Mail activation ",
    text: "",
    html: `
          <div>
            <h1>For activation click on link</h1>
            <a href="${link}">Click here !</a>
          </div>
        `,
  });
}

export default sendActicvationMail