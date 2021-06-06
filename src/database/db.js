import mongoose from 'mongoose'
import logger from '../config/winston.js'

export class MongoDBAtlas {
    
    constructor(Url) {
        this.Url = Url

        process.on('exit', () => {
            this.close()
        })
    }

    async connect(Url) {
        try {
            await mongoose.connect(this.Url, { useNewUrlParser: true, useUnifiedTopology: true }).catch( error => logger.error(`Connection error: ${error}`))
            logger.info('MongoDBAtlas Connected')
        } catch (error) {
            logger.error(`MongoDBAtlas: Error to connect ${error}`)            
        }
    }

    close() {
        logger.info('Ending connection with MongoDBAtlas')
    }
}