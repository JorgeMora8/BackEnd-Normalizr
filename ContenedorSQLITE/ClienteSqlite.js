const ContenedorSqlite = require("./Contenedor"); 
const Options = require("./Options/sqlite3"); 

const ClienteSqlite = new ContenedorSqlite(Options); 

module.exports = ClienteSqlite; 