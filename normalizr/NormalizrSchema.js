//=> Schemas
const {schema, normalize} = require("normalizr")
const authorSchema = new schema.Entity("author", {idAttribute:"mail"})
const messageSchema = new schema.Entity("mensaje", {
    author: [authorSchema]}); 


module.exports = messageSchema