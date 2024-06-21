const express=require('express');
const router=express.Router();
const Person=require('./../models/person')
const {jwtauthMiddleware,generateToken}=require('./../jwt');









router.post('/signup',async(req,res)=>{
    try{
    const data=req.body;

    const newPerson=new Person(data);

    const response=await newPerson.save();
        console.log('data saved');
        const payload={
          id:response.id,
          username:response.username,
        }


        const token=generateToken(payload);
console.log('token is :',token);

    res.status(200).json({response: response , token: token});

   }catch(err){
        console.log(err);
    res.status(500).json(err);
   }
   
})



router.post('/login',async(req,res)=>{
  try{
    const {username,password}=req.body
    const user= await Person.findOne({username: username});
    if(!user || (await user.comparePassword(password))){
      return res.status(401).json({error:'invalid pass'})
    } 
    const payload={
      id:user.id,
      username:user.username,
    }
    const token=generateToken(payload);
    res.json({token})

  }catch(err){
    console.error(err);
    res.status(500).json({error:'internal server error'})


  }
   
})



router.get('/',async(req,res)=>{
    try{
        const data=await Person.find()
        console.log('data fetch')
        res.status(200).json(data);

    }catch(err){
        console.log(err);
      res.status(500).json(err);

    }

})



//router.get('/:workType',async (req,res)=>{
  //  try{const workType=req.params.workType;
   //   if(workType=='chef'||workType=='manager'||workType=='waiter'){
  //      const response= await Person.find({work: workType});
//console.log("response fetched");
 //       res.status(200).json(response);
   //   }else{
   //     res.status(500).json({error:'invalid work'});
  /
     // }
  
   // }catch(err){
    //  console.log(err);
    //  res.status(500).json(err);
   // }
  //})

  router.put('/:id', async(req,res)=>{
    try{
        const personId=req.params.id;
        const updateddata=req.body;

        const response=await Person.findByIdAndUpdate(personId,updateddata,{
            new:true,
            runValidators:true,
        })
     if(!response){
        return res.status(404).json({error:'person not found'})
     }


        console.log('data updates')
        res.status(200).json(response)

    }catch(err){
        console.log(err);
      res.status(500).json(err);

    }

  })


  router.get('/profile',jwtauthMiddleware,async(req,res)=>{
    try{
      const userData=req.user;
      const userId=userData.id;
      const user=await personalbar.findById(userId);

      res.status(200).json({user});

    }catch(err){
      console.log(err);
      res.status(500).json(err);

    }
  })
  
  module.exports=router;
  