const express=require('express');
const router=express.Router();
const Person=require('./../models/person')


router.post('/',async(req,res)=>{
    try{
    const data=req.body;

    const newPerson=new Person(data);

    const response=await newPerson.save();
        console.log('data saved');
    res.status(200).json(response);

   }catch(err){
        console.log(err);
    res.status(500).json(err);
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



router.get('/:workType',async (req,res)=>{
    try{const workType=req.params.workType;
      if(workType=='chef'||workType=='manager'||workType=='waiter'){
        const response= await Person.find({work: workType});
        console.log("response fetched");
        res.status(200).json(response);
      }else{
        res.status(500).json({error:'invalid work'});
  
      }
  
    }catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  })

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
  
  module.exports=router;
  