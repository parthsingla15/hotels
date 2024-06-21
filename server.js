const express = require('express');
const app = express();
const db=require('./db');

require('dotenv').config();
const menu=require('./models/menu');

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const passport=require('./auth');


const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] request made to :${req.originalUrl}`);
  next();
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false});





app.get('/',(req, res) => {

    res.send('hello world');
})

const personroutes=require('./routes/personroutes');
app.use('/person',personroutes);
  

const menuroutes=require('./routes/menuroutes')  
app.use('/menu',menuroutes);




app.listen(3000,()=>{ 
  console.log('server is active')
})