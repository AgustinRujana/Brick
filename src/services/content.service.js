import contentMongoDB from '../database/db.content.service.js'
export const renderLanding = (req, res) => {
    res.render('main')
}

export const getCategorie = async (req,res) => {
    let categorie  = req.query.ctg || null  //Checks if a filter is aplied

    if(categorie) {
        const contentReq = new contentMongoDB()
        const contentRes = await contentReq.read({categorie: categorie}, 'tags packName avatar type categorie details')
        res.json(contentRes)
    } else {
        const contentReq = new contentMongoDB()
        const contentRes = await contentReq.read( {} , 'tags packName avatar type categorie details')
        res.json(contentRes)
    }
} 

export const getZip = async (req, res) => {
    let id = req.params.id
    const contentReq = new contentMongoDB()
    const contentRes = await contentReq.read({_id: id}, 'zipSrc')
    res.json(contentRes)
}
