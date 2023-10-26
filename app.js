// Task1: initiate app and run server at 3000  


const mongoose = require('mongoose')

const express = require('express')
const app = express()
app.use(express.json())
const empdata=require('./Model/employee')

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));


// Task2: create mongoDB connection



  mongoose.connect('mongodb+srv://vinayakrr67:fila1995@cluster0.uwnmryy.mongodb.net/EmployesDB?retryWrites=true&w=majority')
.then(() => {
    console.log("Connected to EmployesDB");
  })
  .catch((error) => {
    console.error("Error connecting to EmployesDB:", error);
  });

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',async(req,res)=>{
    try{
        const empl= await empdata.find();
        res.status(200).json(empl)
    }
    catch(error){
        res.status(404).json(error)
        
    }
})


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id',async(req,res)=>{
    try{
        const id=req.params.id
        const empl= await empdata.findById(id);
        res.status(200).json(empl)
    }
    catch(error){
        res.status(404).json(error)
        
    }
})





//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist',async (req,res)=>{
    const emply=new empdata({
        name:req.body.name,location:req.body.location,position:req.body.position,salary:req.body.salary
    })
    try{
        const empty=await emply.save()
        res.status(200).json(empty)
    }
    catch(error){
        res.status(404).json(error)
    }
    })





//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',async(req,res)=>{
    try{
        const id=req.params.id
        const empl= await empdata.findByIdAndDelete(id);
        res.status(200).json(empl)
    }
    catch(error){
        res.status(404).json(error)
        
    }
})






//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',async(req,res)=>{
    try{
        const data=req.body;
        const empl= await empdata.findOneAndUpdate({_id:data._id},data);
        res.status(200).json(empl)
    }
    catch(error){
        res.status(404).json(error)
        
    }
})






//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



app.listen(3000,()=>{
    console.log("listening to the port 3000")
})