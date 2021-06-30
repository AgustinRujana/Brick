import { messagesBaseRepository } from "./msgBaseRepository";

export class msgClient extends messagesBaseRepository {

    loadPreviousMsg(msg, cuerpoTablaMsg) {
        return msg.forEach(element => {
                    let lineaNueva = document.createElement('tr')
                    lineaNueva.innerHTML = `<td><span class="mail">${element.author.id}</span><span class="mensaje">${element.text}</span></td>`
                    cuerpoTablaMsg.appendChild(lineaNueva)
                })
    }

    onMsg(msg, cuerpoTablaMsg) {
        lineaNueva = document.createElement('tr')
        lineaNueva.innerHTML = `<td><span class="mail">${msg.author.id}</span><span class="mensaje">${msg.text}</span></td>`
        cuerpoTablaMsg.appendChild(lineaNueva)
    }
}