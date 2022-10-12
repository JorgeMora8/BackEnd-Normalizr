//=>Instalacion de contenedor MongoDB para su conexion y uso para el area de mensajes (DESAFIO NORMALIZR); 
const contenedorMongoDB = require("../ContenedorMongoDB/Contenedor.js"); 
const mensajeSchema = require("../ContenedorMongoDB/Config/mensajesSchema.js")

const chatContenedor = new contenedorMongoDB(mensajeSchema)

module.exports = chatContenedor