

class ContenedorSqlite { 
    constructor(config){ 
        this.knex=require("knex")(config)
    }

    CrearTabla(){
      
          return this.knex.schema.createTable("mensajes", (table) => {
            table.increments("id").primary();
            table.string("nombre", 20).notNullable();
            table.string("texto", 50);
            table.string("date", 20);
          });
        
      }

      Guardar(mensaje) {
        return this.knex("mensajes").insert(mensaje);
      }
    
      ObtenerTodosMensajes() {
        return this.knex.select("*").from("mensajes");
      }
    
      CerrarConexion() {
        this.knex.destroy();
      }
}

module.exports = ContenedorSqlite; 