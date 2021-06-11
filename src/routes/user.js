import * as userService from '../services/user.service.js'
import { body, validationResult} from 'express-validator'

export default function userRoutes(app, passport) {
    app.route('/account/login')
        .get((req, res) => {
            res.render('login', {messageEmail: req.flash('loginMsgEmail'), messagePsw: req.flash('loginMsgPsw')})
        })
        .post(
            body('email').notEmpty().withMessage('This field is required'),
            body('password').notEmpty().withMessage('This field is required'),
                (req, res) => {
                        let errors = validationResult(req).errors
                        if(errors.length !== 0) {
                            let errorMsg = {}
                            errors.forEach(e => {
                                errorMsg[e.param] = e.msg                               
                            })
                            res.render('login', {errors: errorMsg})
                        } else {
                            passport.authenticate('local-login', { 
                            successRedirect: '/',
                            failureRedirect: '/account/login',
                            failureFlash: true 
                            })(req, res)
                        }
                }
        )
        

    app.route('/account/register')
        .get((req, res) => {
            res.render('signup', {message: req.flash('signupMsg')})
        })
        .post(
            body('phone').isNumeric().withMessage('This field just allow numbers'),
            body('email').isEmail().withMessage('Must be an email'),
            body('email').notEmpty().withMessage('This field is required'),
            body('firstname').notEmpty().withMessage('This field is required'),
            body('lastname').notEmpty().withMessage('This field is required'),
            body('phone').notEmpty().withMessage('This field is required'),
            body('password').isLength({ min: 5 }).withMessage('Must be at least 5 characters'),
            body('password').notEmpty().withMessage('This field is required'),
                (req, res) => {
                        let errors = validationResult(req).errors
                        if(errors.length !== 0) {
                            let errorMsg = {}
                            errors.forEach(e => {
                                errorMsg[e.param] = e.msg                               
                            })
                            res.render('signup', {errors: errorMsg})
                        } else {
                            passport.authenticate('local-signup', { 
                            successRedirect: '/account/login',
                            failureRedirect: '/account/register',
                            failureFlash: true 
                            })(req, res)
                        }
                }
        )
}
