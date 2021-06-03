import { ContentMongoDB } from '../database/db.content.service'

module.exports = {
    getCategorie: async (req, res) => {
        let categorie  = req.query.categorie || null
        const contentReq = new ContentMongoDB(categorie)
        const contentRes = await contentReq.read()
        res.status(200).send(contentRes)
    },

    getZip: (req, res) => {

    }
}