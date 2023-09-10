// referencia HTML
const lblDesktop = document.querySelector('h1')
const btnAttend = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlert = document.querySelector('.alert')
const lblPendings = document.querySelector('#lblPendientes')

const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es necesario')
}

const desktop = searchParams.get('escritorio')
lblDesktop.innerText = desktop

divAlert.style.display = 'none'

const socket = io()

socket.on('connect', () => {
    btnAttend.disabled = false
})

socket.on('disconnect', () => {
    btnAttend.disabled = true
})

socket.on('pending-tickets', (pendingTickets) => {
    if (pendingTickets === 0) {
        lblPendings.style.display = 'none'
    } else {
        lblPendings.style.display = ''
        lblPendings.innerText = pendingTickets
    }
})

btnAttend.addEventListener('click', () => {

    socket.emit('attend-ticket', { desktop }, ({ ok, ticket }) => {

        if (!ok) {
            lblTicket.innerText = 'Nadie'
            return divAlert.style.display = ''
        }


        lblTicket.innerText = `Ticket ${ticket.number}`

    })
})