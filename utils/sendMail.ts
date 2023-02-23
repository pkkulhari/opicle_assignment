import nodemailer from 'nodemailer'
import nodemailerSendgrid from 'nodemailer-sendgrid'

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY as string,
  })
)

export default function sendEmail(email: string, html: string) {
  var mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Email verification',
    html: html,
  }

  transport.sendMail(mailOptions).catch((error: any) => {
    console.error(error)
  })
}
