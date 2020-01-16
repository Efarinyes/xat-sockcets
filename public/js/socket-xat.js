var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nom') || !params.has('sala')) {

    window.location = 'index.html';
    throw new Error('Es necessari un nom usuari i el de sala');
}

var usuari = {
    nom: params.get('nom'),
    sala: params.get('sala')
};

// on - escoltar peticions
socket.on('connect', function() {
    console.log('Conectat al servidor');

    socket.emit('entrarXat', usuari, function(resp) {
        console.log('Usuaris conectats', resp);
    });
});

socket.on('disconnect', function() {
    console.log('Perduda la conexió amb el servidor');
});
// Enviar informacio client - servidor
// socket.emit('crearMissatge', {
//     Usuari: 'Eduard',
//     missatge: 'Hola mon'
// }, function(resp) {
//     console.log('El servidor diu: ', resp);
// });

// Escoltar al servidor
socket.on('crearMissatge', function(missatge) {
    console.log(missatge);
});

// Escoltem moviments de persones
// ( control d'entrada i sortida del xat )
socket.on('llistaPersones', function(persones) {
    console.log(persones);
});

// Mètode per enviar missatges privats

socket.on('missatgePrivat', function(missatge) {

    console.log('Missatge Privat', missatge);

});