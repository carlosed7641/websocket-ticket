import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server as ServerIO } from 'socket.io'


export class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.server = createServer(this.app)
        this.io = new ServerIO(this.server)

        this.paths = {}

        // Middlewares
        this.middlewares()

        // Rutas de mi aplicación
        this.routes()

        // Sockets
        this.sockets()

    }


    middlewares() {
        // CORS
        this.app.use(cors())

        // Directorio público
        this.app.use(express.static('public'))
    }

    routes() {
      
    }

    sockets() {
        this.io.on("connection", (socket) => {
            console.log("Cliente conectado")
            socket.on("disconnect", () => {
                console.log("Cliente desconectado")
            })
        })
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo http://localhost:${this.port}`)
        })
    }
}