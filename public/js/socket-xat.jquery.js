var params = new URLSearchParams(window.location.search);

var nom = params.get('nom');
var sala = params.get('sala');
// Referències JQuery 

var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMissatge = $('#txtMissatge');
var divChatbox = $('#divChatbox');


// Mètodes ( funcions ) per renderitzar el llistatd'uauaris

function renderitzarUsuaris(persones) { // [{},{},{}] es el que esperem

    console.log(persones);

    var html = '';

    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Xat de <span>' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < persones.length; i++) {
        html += '<li>';
        html += '<a data-id ="' + persones[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + persones[i].nom + ' <small class="text-success">online</small></span></a>';
        html += '</li>';

    }
    divUsuarios.html(html);

}

function renderitzarMissatges(missatge, jo) {

    var html = '';
    var data = new Date(missatge.data);
    var hora = data.getHours() + ':' + data.getMinutes();

    var adminClass = 'info';
    if (missatge.nom === 'Admin') {
        adminClass = 'danger'
    }

    if (jo) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + missatge.nom + '</h5>';
        html += '        <div class="box bg-light-inverse">' + missatge.missatge + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {
        html += '<li class = "animated fadeIn">';
        if (missatge.nom !== 'Admin') {
            html += '   <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }

        html += '    <div class="chat-content">';
        html += '    <h5>' + missatge.nom + ' </h5>';
        html += '    <div class="box bg-light-' + adminClass + '">' + missatge.missatge + '</div>';
        html += '    </div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';

    }
    divChatbox.append(html);
}


function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// Listeners ( escoltem events del Front End )

divUsuarios.on('click', 'a', function() {
    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }

});

formEnviar.on('submit', function(e) {
    e.preventDefault();

    if (txtMissatge.val().trim().length === 0) {
        return;
    }
    socket.emit('crearMissatge', {
        Usuari: nom,
        missatge: txtMissatge.val()
    }, function(missatge) {
        txtMissatge.val('').focus();
        renderitzarMissatges(missatge, true);
        scrollBottom();
    });


});