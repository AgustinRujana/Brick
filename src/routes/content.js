import  * as contentService from '../services/content.service'

module.exports = (app) => {
    app.route('/content')
        .get(contentService.getCategorie)
    app.route('/content/:id')
        .get(contentService.getZip)
}