class Usuaris {
    constructor() {
        this.persones = [];

    }
    afegirPersona(id, nom, sala) {
        let persona = { id, nom, sala };
        this.persones.push(persona);

        return this.persones;
    }
    getPersona(id) {
        let persona = this.persones.filter(persona => persona.id === id)[0];

        return persona;
    }
    getPersones() {
        return this.persones;
    }
    getParticipantsSala(sala) {
        let personesSala = this.persones.filter(persona => persona.sala === sala);
        return personesSala;
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);

        this.persones = this.persones.filter(persona => persona.id != id);

        return personaBorrada;
    }

}

module.exports = {
    Usuaris
};