import express from 'express'
import logger from './config/winston'

const app = express()

//  Compression  //
import compression from 'compression'
app.use(compression())
///////////////////

//  Routes  //
contentRoutes(app)
userRoutes(app)
//////////////

///////////////////////
//  Cluster & Start  //
///////////////////////
import os from 'os'
import cluster from 'cluster'
import http from 'http'
import { MongoDBAtlas } from './database/db'

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
    server.listen(port, async () => {
        logger.info(`Running on port ${port}`)
        const mongo = new MongoDBAtlas('mongodb+srv://agustin:Ar41735233@brickcluster.povsp.mongodb.net/BrickDatabase?retryWrites=true&w=majority')
        await mongo.connect()
        logger.info('MongoDBAtlas Connected')
    })
}


