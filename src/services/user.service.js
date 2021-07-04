import { sendEmail } from "../config/nodemailer.js"

export const mailConfirmation = (req, res) => {
    if(req.user.email.verified == false){
        //LocalHost will not work in production (Reminder to change later)
        res.send(`http://localhost:8080/account/${req.user.email.verificationString}`) 
        //Now I send just the link, but this will send via email with this structure
        let html = `Press <a href=http://localhost:8080/account/${req.user.email.verificationString} here </a> to verified your email. Thanks`
        sendEmail('Company Email', 'Email Confirmation - Brick', req.user.email.email, html)
        //sendEmail send via Nodemailer the html variable information
    } else {
        res.send("This email has already been verified")
    }
    
}