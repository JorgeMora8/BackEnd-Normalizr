const express = require("express"); 
const {Server:HttpServer} = require("http"); 
const {Server:IOServer} = require("socket.io"); 
const {schema, normalize} = require("normalizr")
const PORT = 5000; 

const app = express(); 
const httpServer = new HttpServer(app); 
const io = new IOServer(httpServer); 

app.use(express.static("public")); 
app.use(express.urlencoded({extended:true})); 
app.use(express.json()); 


//HandleBars SetUp
const handlebarsConfig = {defaultlayout: "main.handlebars"}
const {engine} = require("express-handlebars"); 
app.engine("handlebars", engine(handlebarsConfig)); 
app.set("view engine", ".handlebars"); 
app.set("views", "./views");

//=>Instalacion base de datos MYSQL; 
const ClienteMysql = require("../ContenedorMYSQL/ClienteMysql"); 

//=>Instalacion de contenedor MongoDB para su conexion y uso para el area de mensajes (DESAFIO NORMALIZR); 
const contenedorMongoDB = require("../ContenedorMongoDB/Contenedor.js"); 
const mensajeSchema = require("../ContenedorMongoDB/Config/mensajesSchema.js")
const chatContenedor = new contenedorMongoDB(mensajeSchema)

//=> Schemas
const authorSchema = new schema.Entity("author", {idAttribute:"mail"})
const messageSchema = new schema.Entity("mensaje", {
    author: [authorSchema]}); 

//=>Instalacion de routers; 
const productosRouter = require("../router/Productos_test.js")
app.use("/api/productosTest", productosRouter)











const server = httpServer.listen(PORT, () => { 
    console.log("Usando el puerto: " + PORT)
})
server.on("error", (err) => { 
    console.log(err)
})

app.get("/", (req,res) => { 
    res.render("home.handlebars", {productos:ClienteMysql.ObtenerProductos()})
})


io.on("connection", async (socket) => { 

    socket.emit("productos", await ClienteMysql.ObtenerProductos()); 
    socket.emit("chat", normalize(await chatContenedor.obtenerMensajes(), [messageSchema]))


    socket.on("nuevoProducto", async (data) => { 
      await ClienteMysql.Guardar(data)
       io.sockets.emit('productos', await ClienteMysql.ObtenerProductos())
 
    })

    socket.on("nuevoMensaje", async (data) => { 
     await chatContenedor.guardarMensaje(data)
       io.sockets.emit('chat', normalize(await chatContenedor.obtenerMensajes(), [messageSchema]))
    });

})