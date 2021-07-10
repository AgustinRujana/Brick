import ContentDAO from "../model/DAOs/content.js"

class ContentApi {
    constructor() {
        this.contentDAO = new ContentDAO()
    }

    getCategorie = async (categorie) => {
        if(categorie) {
            const content = await this.contentDAO.getCategorie(categorie)
            return content
        } else {
            const content = await this.contentDAO.getAll()
            return content
        }
    }

    getZip = async (id) => {
        const content = await this.contentDAO.getZip(id)
        return content
    }
}

export default ContentApi