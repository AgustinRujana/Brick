import * as model from './models.js'

class ContentMongoDB {
    constructor(categorie) {
        this.categorie = categorie
    }

    async readAll() {
        console.log('lee todo')
        return model.content.find()
    }

    async read(categorie) {
        console.log('lee filtrado')
        return model.content.find({ categorie: categorie })
    }

    //There is no need for a write() operation
}

export default ContentMongoDB