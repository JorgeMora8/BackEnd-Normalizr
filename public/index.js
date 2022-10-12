
const socket = io(); 




//=> Función para limpiar los input; 
const limpieza = () => { 
    document.getElementById("nombre").value = ""; 
    document.getElementById("precio").value = ""; 
    document.getElementById("img").value = ""; 
}

const limpiezaChat = () => { 
    document.getElementById("nombreMensaje").value="";
    document.getElementById("apellidoMensaje").value="";
    document.getElementById("edadMensaje").value="";
    document.getElementById("aliasMensaje").value="";
    document.getElementById("avatarMensaje").value="";
    document.getElementById("mensaje").value="";
}

//=>Enviar productos al contenedor
const agregarProducto = () => { 
    const producto = { 
        nombre:document.getElementById("nombre").value,
        precio:document.getElementById("precio").value, 
        imagen:document.getElementById("img").value, 
    }

    socket.emit("nuevoProducto", producto); 
    limpieza()
    return false
}

//=>Renderiza los productos del contenedor
const renderizarProductos = (data) => { 
    const html = data.map((element, idx) => { 
        return(
            `
            <div class="productoItem">
                <h3 class="nombreItem">${element.nombre}</h3>
                <b class="precioItem">${element.precio}</b>
                <img src="${element.imagen}" width="200px" class="imgItem"/>
            </div>
            `
        )}).join(" "); 
        document.getElementById("productosContenedor").innerHTML=html; 
}

//=>Logica Mensajes; 
const agregarMensaje = () => { 

   //=>Estructurando el mensaje; 
    const mensaje = { 
        author: { 
            nombre:document.getElementById("nombreMensaje").value,
            apellido:document.getElementById("apellidoMensaje").value,
            edad:document.getElementById("edadMensaje").value,
            mail:document.getElementById("mailMensaje").value,
            alias:document.getElementById("aliasMensaje").value,
            avatar:document.getElementById("avatarMensaje").value,
        }, 
        message : document.getElementById("mensaje").value
    }
            socket.emit("nuevoMensaje", mensaje)
            // console.log(mensaje)
            limpiezaChat()
        return false
}



const renderizarChat = (data) => { 

//=> Schemas
const authorSchema = new normalizr.schema.Entity("author")
const messageSchema = new normalizr.schema.Entity("mensaje", {
    author: authorSchema}); 

const messages = normalizr.denormalize(data.result, [messageSchema], data.entities)


    const html = messages.map((element, idx) => { 
        return (
            `<div class="mensajeItem">
            <h1 class="contenidoMensaje">Nombre: ${element.author[0]}</h1>
            <h2 class="contenidoMensaje">Apellido: ${element.author[1]}</h2>
            <h3 class="contenidoMensaje">Correo: ${element.author[3]}</h3>
            <p class="mensaje">${element.message}</p>
            </div>`
        )
    }).join(" "); 
    document.getElementById("chatContenedor").innerHTML = html; 
} 

socket.on("productos", (data) => {
    renderizarProductos(data)
})

socket.on("chat", (data) => { 
    renderizarChat(data)
})

