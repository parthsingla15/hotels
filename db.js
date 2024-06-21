const mongoose= require('mongoose');
require('dotenv').config();
const mongoURL='mongodb://localhost:27017/hotels'
//const mongoURL='DB_URL'

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db=mongoose.connection;
db.on('connected',()=>{
    console.log('Connected to mongodb')
})

db.on('error',(err)=>{
    console.error('Connection error',err)
})

db.on('disconnected',()=>{
    console.log('disconnect to mongodb')
})

module.exports=db;

