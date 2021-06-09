import * as userService from '../services/user.service.js'

export default function userRoutes(app, passport) {
    app.route('/account/login')
        .get(userService.login)
    app.route('/account/register')
        .get(userService.register)
        .post(userService.registerSubmit(passport))   
}

////////////////////////

// app.post('/account/register', passport.authenticate('local-signup', {
//     sucessRedirect: '/',
//     failureRedirect: '/account/register',
//     failureFlash: true
// })

////////////////////////