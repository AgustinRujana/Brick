import mongoose from 'mongoose'
import logger from '../config/winston'

export class MongoDBAtlas {
    
    constructor(Url) {
        this.Url = Url

        process.on('exit', () => {
            this.close()
        })
    }

    async connect(Url) {
        try {
            await mongoose.connect(this.Url, { useNewUrlParser: true, useUnifiedTopology: true })
        } catch (error) {
            logger.error(`MongoDBAtlas: Error to connect ${error}`)            
        }
    }

    close() {
        logger.info('Ending connection with MongoDBAtlas')
    }
}