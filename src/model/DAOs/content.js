import ContentMongoDB from "../../database/db.content.service"

class ContentDAO {
    constructor() {
        this.contentDTO = new ContentMongoDB()
    }

    getAll = async () => {
        return await this.contentDTO.read({} , 'tags packName avatar type categorie details')
    }

    getCategorie = async (categorie) => {
        return await this.contentDTO.read({categorie: categorie}, 'tags packName avatar type categorie details')
    }

    getZip = async (id) => {
        return await this.contentDTO.read({_id: id}, 'zipSrc')
    }
}

export default ContentDAO