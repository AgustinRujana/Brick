import { user as User } from '../../database/models.js'

class UserDAO {
    constructor() {
        this.userDTO = new User()
    }

    verifiedEmail = async (string) => {
        return await User.findOne({'email.verificationString': string})
    }
}

export default UserDAO