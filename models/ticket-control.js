const path = require('path');
const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}


class TicketControl {

    constructor() {
        this.ultimo = 0; // Ultimo ticket
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = []; // Los tickets que se mostraran en pantalla

        this.init();
    }

    get toJSON() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro,
        }
    }

    init() {
        const { ultimo, hoy, tickets, ultimosCuatro } = require("./../db/data.json");
        if (hoy === this.hoy) { // Coinciden la fecha
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimosCuatro = ultimosCuatro;
        } else {
            // Es otro dia
            this.saveDB();
        }
    }

    saveDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJSON));
    }

    siguienteTicket() {
        this.ultimo++;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);


        this.saveDB();
        return 'Ticket ' + ticket.numero; // this.ultimo
    }

    atenderTicket(escritorio) {
        // No tenemos tickets
        if (this.tickets.length === 0) {
            return null;
        }

        const ticket = this.tickets.shift(); // Eliminamos el primer elemento del arreglo -> this.tickets[0];

        ticket.escritorio = escritorio; // ticket para atender

        this.ultimosCuatro.unshift(ticket);

        if (this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.splice(-1, 1); // Eliminamos el ultimo elemento del arreglo
        }

        this.saveDB();

        return ticket;
    }

}


module.exports = TicketControl;