import logger from '../config/winston.js'
import * as model from './models.js'

class ContentMongoDB {
    constructor() {}

    read(query, entries) {
       return model.content.find(query, entries, err => {
            if(err) { 
                logger.error(`Query Error: ${error}`)
            }
        })
    }

    //There is no need for a write() operation
}

export default ContentMongoDB