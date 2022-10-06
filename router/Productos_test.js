const express = require("express"); 
const router = express.Router(); 


//=>Productos provenientes de faker.js; 
const listaProductos = require("../ProductosFaker/ProductosFaker")

router.get("/", (req, res) => { 
    res.render("productos.handlebars", {productos: listaProductos})
})


module.exports = router