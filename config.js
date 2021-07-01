import dotenv from 'dotenv'
import path from 'path'
import minimist from 'minimist';

let port = minimist(process.argv.slice(2))

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

const config = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    HOST: process.env.HOST || 'localhost',
    PORT: port || 8080,
    MONGO_DB_URL: process.env.MONGO_DB_URL || 'MONGO_DB_URL',
    SERVER_MODE: process.env.SERVER_MODE || 'fork',
    DATABASE: process.env.DATABASE || 'mongo'
}

export default config