import  * as contentService from '../services/content.service.js'

export default function contentRoutes(app) {
    app.route('/content')
        .get(contentService.getCategorie)
    app.route('/content/:id')
        .get(contentService.getZip)
}
