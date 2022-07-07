// Referencias HTML
const lblEscritorio = document.querySelector('#lblEscritorio');
const btnAtender = document.querySelector('#btnAtender');
const lblTicket = document.querySelector('#lblTicket');
const lblAlert = document.querySelector('#lblAlert');
const lblPendientes = document.querySelector('#lblPendientes');

// Para obtener datos del url
const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
// console.log(escritorio);
lblEscritorio.innerText = escritorio;

lblAlert.style.display = 'none'; // Al inicio el mensaje de no hay tickets no aparece

// Sockets
const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true; // Se desactiva
});

// Desde el back
socket.on('tickets-pendientes', (pendientes) => {
    if (pendientes === 0) {
        lblPendientes.style.display = 'none';
    } else {
        lblPendientes.style.display = '';
        lblPendientes.innerText = pendientes;
    }
});


btnAtender.addEventListener('click', () => {

    // El payload en esta ocasion seria el ticket que voy a atender
    // Escritorio -> El escritorio donde vamos a atender
    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {

        if (!ok) {
            lblTicket.innerText = `Nadie`;
            return lblAlert.style.display = ''
        };

        lblTicket.innerText = `Ticket ${ticket.numero}`;

    });

    // socket.emit('siguiente-ticket', null, (ticket) => {
    //     // console.log('Desde el server:', ticket);
    //     lblNuevoTicket.innerText = ticket;
    // });

});