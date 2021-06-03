import * as model from './models'

class ContentMongoDB {
    constructor(categorie) {
        this.categorie = categorie
    }

    read(categorie) {
        if(categorie = null) {
            return model.content.find({})
        }
        return model.content.find({ categorie: categorie })
    }

    //There is no need for a write() operation
}

export default ContentMongoDB