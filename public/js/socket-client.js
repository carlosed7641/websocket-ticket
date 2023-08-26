// Referencias HTML
const lblOnline = document.querySelector("#lblOnline")
const lblOffline = document.querySelector("#lblOffline")
const btnSend= document.querySelector("#btnSend")
const txtMessage = document.querySelector("#txtMessage")


const socket = io()

socket.on("connect", () => {

    lblOffline.style.display = "none"
    lblOnline.style.display = ""
})

socket.on("disconnect", () => {

    lblOffline.style.display = ""
    lblOnline.style.display = "none"
})

socket.on("send-message", (payload) => {
    console.log(payload)
})

btnSend.addEventListener("click", () => {
    const message = txtMessage.value

    const payload = {
        message,
        id: "123ABC",
        date: new Date().getTime()
    }
    
    socket.emit("send-message", payload, (id) => {
        console.log("Desde el server", id)
    })
})
