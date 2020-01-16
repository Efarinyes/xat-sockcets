const { io } = require('../server');
const { Usuaris } = require('../classes/usuaris.class');
const { crearMissatge } = require('../utilitats/utilitats');

const usuaris = new Usuaris();

io.on('connection', (client) => {


    client.on('entrarXat', (data, callback) => {

        console.log(data);

        if (!data.nom || !data.sala) {

            return callback({
                error: true,
                missatge: 'El nom usuari/sala es necessari'
            });
        }
        client.join(data.sala);


        usuaris.afegirPersona(client.id, data.nom, data.sala);
        client.broadcast.to(data.sala).emit('llistaPersones', usuaris.getParticipantsSala(data.sala));
        callback(usuaris.getParticipantsSala(data.sala));

    });

    client.on('crearMissatge', (data) => {

        let persona = usuaris.getPersona(client.id);

        let missatge = crearMissatge(persona.nom, data.missatge);
        client.broadcast.to(persona.sala).emit('crearMissatge', missatge);
    });

    client.on('disconnect', () => {
        let personaBorrada = usuaris.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMissatge', crearMissatge('Admin', `${personaBorrada.nom} ha sortit del xat`));
        client.broadcast.to(personaBorrada.sala).emit('llistaPersones', usuaris.getParticipantsSala(personaBorrada.sala));

    });

    client.on('missatgePrivat', data => {
        let persona = usuaris.getPersona(client.id);

        client.broadcast.to(data.per).emit('missatgePrivat', crearMissatge(persona.nom, data.missatge));
    });

});