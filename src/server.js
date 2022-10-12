const app = require("../app/app.js")
const {Server:HttpServer} = require("http"); 
const {Server:IOServer} = require("socket.io"); 
const {schema, normalize} = require("normalizr")
const ClienteMysql = require("../ContenedorMYSQL/ClienteMysql"); 
const chatContenedor = require("../ContenedorMongoDB/DAOMongo.js")
const messageSchema = require("../normalizr/NormalizrSchema.js")
const PORT = 5000; 
const httpServer = new HttpServer(app); 
const io = new IOServer(httpServer); 



const server = httpServer.listen(PORT, () => { 
    console.log("Usando el puerto: " + PORT)
})
server.on("error", (err) => { 
    console.log(err)
})

app.get("/", (req,res) => { 
    if(req.session.nombre && req.session.email){
    res.render("home.handlebars", {productos:ClienteMysql.ObtenerProductos(), nombre:req.session.nombre, email:req.session.email})}
    else{ 
        res.redirect("/login")
    }
})

app.get("/login", (req,res)=>{ 
        res.render("login.handlebars")
})

app.post("/login", (req,res)=>{ 
    let datos = req.body
    req.session.nombre = datos.nombre; 
    req.session.email = datos.email; 


    res.redirect("/")
})

app.get("/logout", (req,res)=>{ 
    const nombre = req.session.nombre; 
    if(!nombre)res.redirect("/login"); 
    else { 
        req.session.destroy((err) => { 
            if(!err){ 
                res.redirect("/login")
            }else{ 
                console.log(err)
            }
        })
    }
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