// referencia HTML
const lblDesktop = document.querySelector('h1')
const btnAttend = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlert = document.querySelector('.alert')

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

btnAttend.addEventListener('click', () => {

    socket.emit('attend-ticket', { desktop }, ({ ok, ticket }) => {

        if (!ok) {
            lblTicket.innerText = 'Nadie'
            return divAlert.style.display = ''
        }


        lblTicket.innerText = `Ticket ${ticket.number}`

    })
})