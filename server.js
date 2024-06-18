const express = require('express');
const app = express();
const db=require('./db');

const menu=require('./models/menu')

const bodyParser=require('body-parser');
app.use(bodyParser.json());


app.get('/', (req, res) => {

    res.send('hello world');
})

const personroutes=require('./routes/personroutes');
app.use('/person',personroutes);
  

const menuroutes=require('./routes/menuroutes') 
app.use('/menu',menuroutes);

app.listen(3000,()=>{ 
  console.log('server is active')
})