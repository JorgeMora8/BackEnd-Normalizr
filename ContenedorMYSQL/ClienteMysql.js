const ContenedorMysql = require("./Contenedor"); 
const Options = require("./Options/Options"); 

const ClienteMysql = new ContenedorMysql(Options)

module.exports = ClienteMysql; 

