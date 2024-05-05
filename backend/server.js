
const exp=require('express')
const app=exp();
const path=require('path')
require('dotenv').config();
app.use(exp.json())
const mc=require('mongodb').MongoClient
mc.connect('mongodb://localhost:27017')
.then( client => {
    //get the database obj
    const dbObj=client.db('webathondb')
    const userCollectionObj=dbObj.collection('users');
    const reciepeCollectionObj=dbObj.collection('reciepeCollection');
    const savedReciepesCollectionObj=dbObj.collection('savedReciepeCollection');
    app.set('userCollection',userCollectionObj)
    app.set('reciepeCollection',reciepeCollectionObj);
    app.set('savedReciepeCollection',savedReciepesCollectionObj);
    console.log("CONNECTION TO DATABASE SUCCESSFUL")
})
.catch(err=>{
    console.log(err);
})

//JOIN FRONTEND AND BACKEND
app.use(exp.static(path.join(__dirname,'../frontend/build')))


//import apis
const userApp=require('./APIs/user-api')
//handover requests to specific apis
app.use('/user-api',userApp);


//error handling
app.use((err,req,res,next)=>{
    res.send({status:"error",message:err.message})
})

const port=process.env.PORT || 1000;
app.listen(port,()=>console.log(`http server started at port ${port}`));