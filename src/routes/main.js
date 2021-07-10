import express from 'express'
const router = express.Router()

import MainControler from '../controler/main.js'

class RouterMain {
    constructor() {
        this.mainControler = new MainControler()
    }

    start() {
        router.get('/', this.mainControler.renderLanding)
        return router
    }
}

export default RouterMain