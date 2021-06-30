export class messagesBaseRepository {
    constructor(id, nombre, apellido, edad, alias, avatar, text) {
        this.author = {id, nombre, apellido, edad, alias, avatar}
        this.text = text
    }

    msgFormatter(id, nombre, apellido, edad, alias, avatar, text) {
        const msg = {
            author: {
                id: id,
                nombre: nombre,
                apellido: apellido,
                edad:edad,
                alias: alias,
                avatar: avatar
            },
            text : text
        }
        return msg
    }
} 