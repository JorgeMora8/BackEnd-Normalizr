const express = require("express"); 
const {Server:HttpServer} = require("http"); 
const {Server:IOServer} = require("socket.io"); 
const {schema, normalize} = require("normalizr")


const app = express(); 
const httpServer = new HttpServer(app); 
const io = new IOServer(httpServer); 

app.use(express.static("public")); 
app.use(express.urlencoded({extended:true})); 
app.use(express.json());

const handlebarsConfig = {defaultlayout: "main.handlebars"}
const {engine} = require("express-handlebars"); 
app.engine("handlebars", engine(handlebarsConfig)); 
app.set("view engine", ".handlebars"); 
app.set("views", "./views");

const productosRouter = require("../router/Productos_test.js")
app.use("/api/productosTest", productosRouter)

const session = require("express-session") 

const configSession = require("../config/configDATA.js")
app.use(session(configSession))


module.exports = app