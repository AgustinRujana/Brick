import logger from "../config/winston.js"
import UserApi from "../api/user.js"

class UserControler {
    constructor() {
        this.userApi = new UserApi()
    }

    mailConfirmation = async (req, res) => {
        try {
            let response = await this.userApi.mailConfirmation(req.user.email.verified)
            res.send(response)
        } catch (error) {
            logger.error(`Error UserControler - mailConfirmation: ${error}`)
        }
    }

    verifiedEmail = async (req, res) => {
        try {
            const { uniqueString } = req.params
            let response = await this.userApi.verifiedEmail(uniqueString)
            response == true ? res.redirect('/') : res.status(404).send('User Not found')            
        } catch (error) {
            logger.error(`Error UserControler - verifiedEmail: ${error}`)
        }

    }
}

export default UserControler