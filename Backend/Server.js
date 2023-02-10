const server = require('./App');

const PORT = process.env.PORT;

server.listen(PORT, (err)=>{
    if(err){
        console.log('Cant Connect to Server', err);
    }
    console.log(`Server Running On: ${PORT}`);
})