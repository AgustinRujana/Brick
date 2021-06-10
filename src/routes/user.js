import * as userService from '../services/user.service.js'
import { body, validationResult} from 'express-validator'

export default function userRoutes(app, passport) {
    app.route('/account/login')
        .get(userService.login)

    app.route('/account/register')
        .get((req, res) => {
            res.render('signup', {message: req.flash('signupMsg')})
        })
        .post(
            body('firstname').notEmpty().withMessage('This field is required'),
            body('lastname').notEmpty().withMessage('This field is required'),
            body('phone').notEmpty().withMessage('This field is required'),
            body('email').isEmail().withMessage('Must be an email'),
            body('password').isLength({ min: 5 }).withMessage('Must be at least 5 characters'),
            body('phone').isNumeric().withMessage('This field just allow numbers'),
                (req, res) => {
                        let errors = validationResult(req).errors
                        if(errors.length !== 0) {
                            console.log(errors)
                            res.render('signup', {errors: errors})
                        } else {
                            passport.authenticate('local-signup', { 
                            successRedirect: '/',
                            failureRedirect: '/account/register',
                            failureFlash: true 
                            })(req, res)
                        }
                }
        )
}
