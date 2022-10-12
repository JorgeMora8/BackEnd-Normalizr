//Instalacion de connect-mongo. Sesiones
const MongoStore = require("connect-mongo");


const MongoURL = "mongodb://localhost:27017"
const Store = MongoStore.create({mongoUrl: MongoURL, ttl:60})

const configSession = { 
    store: Store, 
    saveUninitialized:false, 
    resave:false, 
    secret:"Programacion"
}


module.exports=configSession