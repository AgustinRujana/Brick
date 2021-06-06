import express from 'express'
import logger from './config/winston.js'

const app = express()

//  Cookie Parser //
import cookieParser from 'cookie-parser'
app.use(cookieParser())
////////////////////

//  Compression  //
import compression from 'compression'
app.use(compression())
///////////////////

//  Session  //
import session from 'session'
app.use(session({
    secret: 'NeverUnderstoodWhyThisExist',
    saveUninitialized: true
}))
///////////////

// Handlebars //
import handlebarsConfig from './config/handlebars.js'
handlebarsConfig(app)
////////////////

//////////////////////////////////////
//          Cluster & Start         //
//////////////////////////////////////
import os from 'os'
import cluster from 'cluster'
import http from 'http'
import { MongoDBAtlas } from './database/db.js'

const numCPUs = os.cpus().length
const server = http.Server(app)
const port = 8080 || process.env.port

if(cluster.isMaster) {
    logger.info(`PID Master ${process.pid}`)
    for(let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    
    cluster.on('exit', worker => {
        logger.info(`Worker ${worker.process.pid} end`)
        cluster.fork()
    })
} else {

    //  Routes  //
    import contentRoutes from './routes/content.js'
    import userRoutes from './routes/user.js'
    contentRoutes(app)
    userRoutes(app)
    //////////////
    
    server.listen(port, async () => {
        logger.info(`Running on port ${port}`)
        const mongo = new MongoDBAtlas('mongodb+srv://agustin:Ar41735233@brickcluster.povsp.mongodb.net/BrickDatabase?retryWrites=true&w=majority')
        await mongo.connect()
    })
}


