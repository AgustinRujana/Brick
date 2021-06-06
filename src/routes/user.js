import * as userService from '../services/user.service.js'

export default function userRoutes(app) {
    app.route('/account/login')
        .get()
    app.route('/account/register')
        .get()
}
