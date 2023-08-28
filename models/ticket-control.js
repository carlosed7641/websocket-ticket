import path from 'path'
import fs from 'fs'
import data from '../database/data.json' assert { type: "json"}
import { fileURLToPath } from 'url'


const __dirname = path.dirname(fileURLToPath(import.meta.url))


export class Ticket {
    constructor(number, desktop) {
        this.number = number
        this.desktop = desktop
    }
}


export class TicketControl {

    constructor() {
        this.latest = 0
        this.today = new Date().getDate()
        this.tickets = []
        this.lastFour = []

        this.init()

    }

    get toJson() {
        return {
            latest: this.latest,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        }
    }

    init() {

        const { latest, today, tickets, lastFour } = data

        if (today === this.today) {
            this.tickets = tickets
            this.latest = latest
            this.lastFour = lastFour
        } else {
            // It's another day
            this.saveDB()
        }
      
    
    }

    saveDB() {    
        const dbPath = path.join(__dirname, '../database/data.json')
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }

    next() {
        this.latest += 1
        const ticket = new Ticket(this.latest, null)
        this.tickets.push(ticket)

        this.saveDB()

        return 'Ticket ' + ticket.number
    }

    attendTicket(desktop) {

        // No tickets
        if (!this.tickets.length) return null

        const ticket = this.tickets.shift()
        ticket.desktop = desktop

        this.lastFour.unshift(ticket)

        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1)
        }

        this.saveDB()

        return ticket
    }
}