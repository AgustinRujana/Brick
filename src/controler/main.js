class MainControler {
    constructor() {}

    renderLanding = (req, res) => {
        let avatar, name, plan = null
        if(req.user){
            name = `${req.user.firstname} ${req.user.lastname}`
            avatar = req.user.avatar
            switch(req.user.plan){
                case 0:
                    plan = 'Free user'
                    break
                case 1:
                    plan = 'Bronce user'
                    break
                case 2:
                    plan = 'Silver user'
                    break
                case 3:
                    plan = 'Gold user'
                    break
            }
        }
        res.render('main', {avatar: avatar, plan: plan, name: name})
    }
}

export default MainControler
