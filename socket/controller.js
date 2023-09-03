import { TicketControl } from "../models/ticket-control.js"

const ticketControl = new TicketControl() 

export const socketController = (socket) => {

    // Cuando un cliente se conecta
    socket.emit("latest-ticket", ticketControl.latest)
    socket.emit("current-status", ticketControl.lastFour)
    socket.emit("pending-tickets", ticketControl.tickets.length)


    socket.on("next-ticket", (payload, callback)  => {
        const next = ticketControl.next()
        callback(next)
        socket.broadcast.emit("pending-tickets", ticketControl.tickets.length)
    })

    socket.on("attend-ticket", ({ desktop }, callback) => {
        if (!desktop) {
            return callback({
                ok: false,
                msg: "El escritorio es obligatorio"
            })
        }


        const ticket = ticketControl.attendTicket(desktop)

        // Actualizar / notificar cambios en los últimos 4
        socket.broadcast.emit("current-status", ticketControl.lastFour)
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
