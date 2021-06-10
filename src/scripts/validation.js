import logger from '../config/winston.js'
import {user as User} from '../database/models.js'

const validationResult = (strategy, data) => {
    let errors = {}
    
    switch (strategy) {
        case 'login':
            return errors
        case 'register':
            let user =  User.findOne({email: data.email}).exec() //NO ESTA CARGANDO EL ERROR DE EMAIL
            if(user != null) {
                errors.emailError = "*Email taken" 
            }
            if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) === false) {
                errors.emailError = "*Email not valid"
            }
            if(data.password.length < 6) { errors.passwordError = "*Password is too short" }
            let commonPsw = ['123456', '123456789', 'password', '111111', '123123', 'qwerty']
            commonPsw.forEach( e => {
                if(data.password == e){
                    errors.passwordError = "*Please get more creative"
                }
            })
            if(data.phone.length == 0){ errors.phoneError = "*This field is required"}
            if(data.firstname.length == 0){ errors.firstnameError = "*This field is required"}
            if(data.lastname.length == 0){ errors.lastnameError = "*This field is required"}
            return errors 
    }
}

export default validationResult