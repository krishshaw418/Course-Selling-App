const {createClient} = require('redis');
require('dotenv').config({path:'../../.env'});

const client = createClient({
    url: process.env.REDIS_URL,
})

client.on('error',(err)=>{
    console.error(`Redis Client Error:`,err);
})

client.connect()
.then(async ()=>{
    console.log('Redis active');
})
.catch((err)=>{
    console.error(`Resis connection error:`,err);
})

module.exports = client;