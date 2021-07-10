import UserDAO from "../model/DAOs/user"

class UserApi {
    constructor(){
        this.userDAO = new UserDAO()
    } 

    mailConfirmation = (props) => {
        if(props == false){
            return `http://localhost:8080/verified/${props}`
        } else {
            return "This email has already been verified"
        }    
    }

    verifiedEmail = async (req, res) => {
        const user = this.userDAO.verifiedEmail
        if(user) {
            return true
        } else {
            return false
        }
    }

}

export default UserApi