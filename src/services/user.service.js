// import userMongoDB from '../database/db.content.service.js'
import passport from 'passport'
import { validationResult } from '../scripts/validation.js'

export const login = (req, res) => {
    res.render('login')
}

export const loginSubmit = (req, res) => {
    const errors = validationResult('login', req.body)
    if (Object.entries(errors).length !== 0) {
        return res.status(422).render('login', { errors : errors })
    }

    const data = req.body
    res.status(200).send(data)
}

export const register = (req, res) => {
    res.render('signup', ( {msg: req.flash('signupMsg')} ))
}

export const registerSubmit = (passport) => {
    return  passport.authenticate('local-signup', {
        sucessRedirect: '/',
        failureRedirect: '/account/register',
        failureFlash: true
    })
}
