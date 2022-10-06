const faker = require("faker");

const Productos = [
    {
        nombre:faker.commerce.productName(), 
        precio:faker.commerce.price(), 
        imagen:faker.image.business(), 
    },
    {
        nombre:faker.commerce.product(),  
        precio:faker.commerce.price(), 
        imagen:faker.image.business(),
    },
    {
        nombre:faker.commerce.product(),  
        precio:faker.commerce.price(), 
        imagen:faker.image.business(),
    },
    {
        nombre:faker.commerce.product(), 
        precio:faker.commerce.price(), 
        imagen:faker.image.business(),
    },
    {
        nombre:faker.commerce.product(), 
        precio:faker.commerce.price(), 
        imagen:faker.image.business(),
    },
]

module.exports = Productos;