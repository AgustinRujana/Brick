import nodemailer from 'nodemailer'
import logger from './winston'

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Emitter Email',
        pass: 'Password'
    }
})

export const sendEmail = (from, subject, message, to, cb) => {
    const Options = {
        from: from,
        to: to,
        subject: subject,
        html: message,
    }

    transport.sendMail(Options, (error, info) => {
        logger.error(`Error to send email: ${error}`)
        logger.info(`Information on sending email: ${info}`)
        cb(error, info)
    })
}