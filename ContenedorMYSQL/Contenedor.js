class ContenedorMysql { 
    constructor(config){ 
        this.knex = require("knex")(config)
    }

    crearTabla() {
      return this.knex.schema.hasTable("productos").then((data) => { 
        if(!data){ 
          this.knex.schema.createTable("productos", (tabla) => { 
            tabla.increments('id'),
                    tabla.string('nombre'),
                    tabla.integer('precio')
                    tabla.string("imagen")
          })
        }
      }).catch((err) => { 
        console.log(err)
      })
    }
    
      Guardar(producto) {
        return this.knex("productos").insert(producto);
      }
    
      ObtenerProductos() {
        return this.knex.select("*").from("productos");
      }
    
      ObtenerPorId(id) {
        return this.knex("productos").select("*").where({ id }).first();
      }
    
      EliminarPorId(id) {
        const producto = this.getById(id);
    
        if (Object.entries(producto).length < 0) {
          return false;
        }
    
        this.knex("productos").where("id", id).del();
    
        return true;
      }
    
      ActualizarProducto(objeto, id) {
        return this.knex("productos").where("id", id).update(objeto);
      }
    
      close() {
        this.knex.destroy();
      }
}

module.exports = ContenedorMysql