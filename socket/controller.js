import { TicketControl } from "../models/ticket-control.js"

const ticketControl = new TicketControl() 

export const socketController = (socket) => {

    socket.on("send-message", (payload, callback)  => {
        const id = 123458

        callback(id)

        socket.broadcast.emit("send-message", payload)
    })
}