import { messagesBaseRepository } from "./msgBaseRepository";
import fs from 'fs'

export class msgServer extends messagesBaseRepository {

    readMsg() {
        let messagesFromServer = fs.readFileSync('./public/messages.json', 'utf8')
        return JSON.parse(messagesFromServer)
    }

    saveMsg(msg) {
        let messagesFromServer = fs.readFileSync('./public/messages.json', 'utf8')
        messagesFromServer = JSON.parse(messagesFromServer)
        let messagesJSON = [...messagesFromServer, msg]
        fs.writeFile('./public/messages.json', JSON.stringify(messagesJSON), 'utf8', function (err) { console.log(err)})
    }
}