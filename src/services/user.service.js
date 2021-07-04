import { sendEmail } from "../config/nodemailer.js"
import { user as User } from "../database/models.js"

export const mailConfirmation = (req, res) => {
    if(req.user.email.verified == false){
        //LocalHost will not work in production (Reminder to change later)
        res.send(`http://localhost:8080/verified/${req.user.email.verificationString}`) 
        //Now I send just the link, but this will send via email with this structure
        let html = `Press <a href=http://localhost:8080/verified/${req.user.email.verificationString} here </a> to verified your email. Thanks`
        sendEmail('Company Email', 'Email Confirmation - Brick', req.user.email.email, html)
        //sendEmail send via Nodemailer the html variable information
    } else {
        res.send("This email has already been verified")
    }    
}

export const verifiedEmail = async (req, res) => {
    const { uniqueString } = req.params
    const user = await User.findOne({'email.verificationString': uniqueString})
    if(user) {
        user.email = {email: user.email.email, verified: true}
        await user.save()
        res.redirect('/')
    } else {
        res.status(404).send('User Not found')
    }
}