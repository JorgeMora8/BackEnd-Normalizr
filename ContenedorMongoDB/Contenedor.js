const mongoose = require("mongoose"); 
const uri = "mongodb://localhost:27017"; 

mongoose.connect(uri); 


//=>Contenedor de mensajes usango MongoDB
class Contenedor{ 
    constructor(schema){ 
        this.schema = schema
    }

    async guardarMensaje(objeto) {
        const MensajesGuardados = await this.obtenerMensajes()
        const id = !MensajesGuardados.length ? 1 : parseInt(MensajesGuardados[MensajesGuardados.length - 1].id) + 1
        //=>Se agrega un ID
        objeto.id = id.toString()
        await this.schema.create(objeto);
      };

      async obtenerMensajes() {
        return await this.schema.find({}, { _id: 0, __v: 0 }).lean();
      };


    };

module.exports = Contenedor