const crearMissatge = (nom, missatge) => {
    return {
        nom,
        missatge,
        data: new Date().getTime()
    };
};


module.exports = {
    crearMissatge
};