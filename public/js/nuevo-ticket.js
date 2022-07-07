// Referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('#btnCrear');

const socket = io();

socket.on('connect', () => {
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true; // Se desactiva
});

// Desde el back
socket.on('ultimo-ticket', (ultimo) => {
    lblNuevoTicket.innerText = `Ticket ${ultimo}`;
});


btnCrear.addEventListener('click', () => {

    socket.emit('siguiente-ticket', null, (ticket) => {
        // console.log('Desde el server:', ticket);
        lblNuevoTicket.innerText = ticket;
    });

});