import persistanceFS from "./DAOFS.js"
import persistanceMongoDBAtlas from "./DAOMongoDB.js"
import logger from "../config/winston.js"
import config from "../../config.js"

const MongoDBAtlasURL = config.MONGO_DB_URL

////////////////////////////////////////////
//                FACTORY                 //
////////////////////////////////////////////
class factoryContentModel {
    static instance

    constructor(option) {
        if(!factoryContentModel.instance) {
            logger.info(`${option} is the selected persistance`)
            switch(option) {
                case 'File': return new persistanceFS()
                case 'Mongo': return new persistanceMongoDBAtlas(MongoDBAtlasURL)
            }
        }
        else {
            logger.error('Database already choose')
        }
    }
}



export default factoryContentModel