import mongoose from 'mongoose'
import logger from '../config/winston.js'
import { content as Content } from './models.js';

export default class persistanceMongoDBAtlas {
    
    constructor(url) {
        ;( async () => {
            try {
                await mongoose.connect(url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    useCreateIndex: true
                });
                logger.info('Mongo DB connected')
            }
            catch(error) {
                logger.error('Error to connect to MongoDB')
            }
        })()
    }
    getContents = async () => {
        try {
            return await Content.find({}).lean()
        }
        catch(error) {
            logger.error('Error to get content')
        }
    }
    addContent = async content => {
        try {
            const instance = new Content(content);
            await instance.save()
        }
        catch(error) {
            logger.error('Error to add content')
        }
    }
}