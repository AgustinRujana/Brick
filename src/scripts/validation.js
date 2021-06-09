export function validationResult(test, data) {
    let errors = {}

    const checkRegister = (type) => {
        switch (type) {
            case 'password':
                if(data.password.length < 6){
                    errors.passwordError = "*Password is too short"
                }

                let commonPsw = ['123456', '123456789', 'password', '111111', '123123', 'qwerty']
                commonPsw.forEach( e => {
                    if(data.password == e){
                        errors.passwordError = "*Please get more creative"
                    }
                })
            case 'email':
                if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) === false) {
                    errors.emailError = "*Email not valid"
                }

                // Falta error si ya esta logueado el mail         
        }
    }
    
    switch (test) {
        case 'login':
            console.log('Test Login')
            return errors
        case 'register':
            checkRegister('password')
            checkRegister('email')
            return errors 

    }
}