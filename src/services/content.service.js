import ContentMongoDB from '../database/db.content.service.js'

export const getCategorie = async (req,res) => {
    let categorie  = req.query.ctg || null
    if(categorie) {
        const contentReq = new ContentMongoDB(categorie)
        const contentRes = await contentReq.read()
        res.send(contentRes)
    } else {
            const contentReq = new ContentMongoDB()
            const contentRes = await contentReq.readAll()
            res.send(contentRes)
    }
}

export const getZip = (req, res) => {

}
