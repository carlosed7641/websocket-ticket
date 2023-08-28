import { TicketControl } from "../models/ticket-control.js"

const ticketControl = new TicketControl() 

export const socketController = (socket) => {

    socket.emit("latest-ticket", ticketControl.latest)

    socket.on("next-ticket", (payload, callback)  => {
        const next = ticketControl.next()
        callback(next)

    })

    socket.on("attend-ticket", ({ desktop }, callback) => {
        if (!desktop) {
            return callback({
                ok: false,
                msg: "El escritorio es obligatorio"
            })
        }

        const ticket = ticketControl.attendTicket(desktop)
        socket.broadcast.emit("latest-ticket", ticketControl.latest)
        socket.emit("pending-tickets", ticketControl.tickets.length)
        socket.broadcast.emit("pending-tickets", ticketControl.tickets.length)

        if (!ticket) {
            callback({
                ok: false,
                msg: "Ya no hay tickets pendientes"
            })
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    })
}
