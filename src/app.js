import express from 'express'
import logger from './config/winston.js'
import cookieParser from 'cookie-parser'
import compression from 'compression'

import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import os from 'os'
import cluster from 'cluster'
import http from 'http'
import { MongoDBAtlas } from './database/db.js'

import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import passportConfig from './config/passport.js'
import flash from 'connect-flash'
const app = express()

//  Cookie & Body Parser //
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.join(__dirname, '/public')))
////////////////////

//  Compression  //
app.use(compression())
///////////////////

//  Session, Passport & Flash//
const MongoDBAtlasURL = 'mongodb+srv://agustin:Ar41735233@brickcluster.povsp.mongodb.net/BrickDatabase?retryWrites=true&w=majority'
passportConfig(passport)
app.use(session({
    secret: 'NeverUnderstoodWhyThisExist',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: MongoDBAtlasURL,
        ttl: 24 * 60 * 60 //Session persist for the day
      })
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
///////////////

// Handlebars //
import handlebars from 'express-handlebars'
app.engine( 
"hbs",
handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs"
})
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'views'));
////////////////
    
//  Routes  //
import RouterMain from './routes/main.js'
import RouterContent from './routes/content.js'
import RouterUser from './routes/user.js'

const routerMain = new RouterMain()
const routerContent = new RouterContent()
const routerUser = new RouterUser(passport)

app.use('/', routerMain.start())
app.use('/content', routerContent.start())
app.use('/account', routerUser.start())
//////////////

//////////////////////////////////////
//          Cluster & Start         //
//////////////////////////////////////

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
        const mongo = new MongoDBAtlas(MongoDBAtlasURL)
        await mongo.connect()
    })
}


