

export const socketController = (socket) => {
    socket.on("disconnect", () => {

    })

    socket.on("send-message", (payload, callback)  => {
        const id = 123458

        callback(id)

        socket.broadcast.emit("send-message", payload)
    })
}