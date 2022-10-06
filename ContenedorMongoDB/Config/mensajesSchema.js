
const { Schema, model, default: mongoose} = require("mongoose"); 

const mensajeSchema = new mongoose.Schema({ 
   id: String,
   author: Object,
   message: String,
})


module.exports = mongoose.model("chat", mensajeSchema)