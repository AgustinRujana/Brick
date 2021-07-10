import express from 'express'
const router = express.Router()

import ContentControler from '../controler/content.js'
import { isLoggedIn } from '../middleware/sessionLogs.js'

class RouterContent {
    constructor() {
        this.contentControler = new ContentControler()
    }

    start() {
        router.get('/', this.contentControler.getCategorie)
        router.get('/:id', isLoggedIn, this.contentControler.getZip) //Chequear donde van los middlewares
        return router
    }
}

export default RouterContent