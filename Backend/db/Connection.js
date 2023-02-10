const mongoose = require('mongoose');
const DB = process.env.DB_URI;
const DB_PORT = 27017;

mongoose.connect(DB)
    .then(()=>{
        console.log(`Mongo Running On ${DB_PORT}`);
    })
    .catch((err)=>{
        console.log('Error Connecting To Mongo', err);
    })