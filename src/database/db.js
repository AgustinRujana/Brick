import persistanceFS from "./persistanceFS.js"
import persistanceMongoDBAtlas from "./persistanceMongoDB.js"
import logger from "../config/winston.js"

const MongoDBAtlasURL = 'mongodb+srv://agustin:Ar41735233@brickcluster.povsp.mongodb.net/BrickDatabase?retryWrites=true&w=majority'

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