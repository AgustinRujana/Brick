import winston from 'winston'

export const logger = winston.createLogger({
    transports: [
        new winston.transport.File({ filename: './logs/error.log', level: 'error'}),
        new winston.transport.File({ filename: './logs/error.log', level: 'warn'}),
        new winston.transport.File({ filename: './logs/error.log', level: 'info'})
    ]
})