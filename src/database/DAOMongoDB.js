import mongoose from 'mongoose'
import logger from '../config/winston.js'
import contentMongoDB from './db.content.service.js';
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

    async getContents() {
        try {
            return await Content.find({}).lean()
        }
        catch(error) {
            logger.error('Error to get content')
        }
    }

    async addContent(content) {
        try {
            const instance = new Content(content);
            await instance.save()
        }
        catch(error) {
            logger.error('Error to add content')
        }
    }

    async getZip(id) {
        const contentReq = new contentMongoDB()
        const contentRes = await contentReq.read({_id: id}, 'zipSrc')
        return zipDTO(id, contentRes.zipSrc)
    }
}