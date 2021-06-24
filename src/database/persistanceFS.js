import fs from 'fs'
import logger from '../config/winston.js'

export default class persistanceFS {
    constructor() {
        ;( async () => {
            try {
                await fs.promises.readFile('data.txt')
            }
            catch {
                await fs.promises.writeFile('data.txt', JSON.stringify([]))
            }
        })()
    }
    getContents = async () => {
        try {
            let data = await fs.promises.readFile('data.txt')
            return JSON.parse(data)
        }
        catch(error) {
            logger.error(`Error FS: ${error}`)
        }
    }
    addContent = async content => {
        try {
            let contents = JSON.parse(await fs.promises.readFile('data.txt'))
            contents.push(content)
            await fs.promises.writeFile('data.txt', JSON.stringify(contents))
        }
        catch(error) {
            logger.error(`Error FS: ${error}`)
        }
    }
}

