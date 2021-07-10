import ContentApi from "../api/content.js"
import logger from "../config/winston.js"

class ContentControler {
    constructor() {
        this.contentApi = new ContentApi()
    }

    getCategorie = async (req,res) => {
        try {
            let categorie  = req.query.ctg || null  //Checks if a filter is aplied
            let content = await this.contentApi.getCategorie(categorie)
            res.send(content)
        } catch (error) {
            logger.error(`Error ContentControler - getCategorie: ${error}`)
        }
    }

    getZip = async (req, res) => {
        try {
            let id = req.params.id
            let content = await this.contentApi.getZip(id)
            res.send(content)
        } catch (error) {
            logger.error(`Error ContentControler - getZip: ${error}`)
        }
    }
}

export default ContentControler