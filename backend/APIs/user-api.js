const exp=require('express')
const userApp=exp.Router()
const {createUser,userLogin}=require('./Util');
const expressAsyncHandler=require('express-async-handler');


require('dotenv').config();
//body parser
userApp.use(exp.json())

let userCollectionObj,reciepeCollectionObj,savedReciepeCollectionObj;
userApp.use((req,res,next)=>{
    userCollectionObj=req.app.get('userCollection');
    reciepeCollectionObj=req.app.get('reciepeCollection');
    savedReciepeCollectionObj=req.app.get('savedReciepeCollection');
    next();
})


//registration
userApp.post('/user',expressAsyncHandler(createUser));

//login
userApp.post('/login',expressAsyncHandler(userLogin));
// Reciepes request
userApp.get('/reciepes',expressAsyncHandler(async(req,res)=>{
    const reciepeList=await reciepeCollectionObj.find({status:true}).toArray();
    res.send({message:"ALL RECIEPES",payload:reciepeList});
}))
// POST RECIEPE
userApp.post('/new-reciepe',expressAsyncHandler(async(req,res)=>{
    const reciepe=req.body;
    let result=await reciepeCollectionObj.insertOne(reciepe);
    return res.send({message:"NEW RECIEPE ADDED"});
}))
//POST COMMENTS ON RECIEPES
userApp.post('/comments/:reciepeId',expressAsyncHandler(async(req,res)=>{

    let idFromUrl = req.params.reciepeId
    const comment=req.body;
    let dbReciepe=await reciepeCollectionObj.updateOne({reciepeId:idFromUrl},{$addToSet:{comments:comment}});
    res.send({message:"comment added"});
}))
//GET HIS OWN RECIEPES
userApp.get('/reciepe/:username',expressAsyncHandler(async(req,res)=>{
    const usernameFromUrl=req.params.username;
    const reciepeList=await reciepeCollectionObj.find({username:usernameFromUrl}).toArray();
    if(reciepeList==null){
        res.send({message:"no reciepes"});
    }else{
        res.send({message:"user reciepes",payload:reciepeList});
    }
}))

// GET RECIEPE BY CUISINE
userApp.get('/reciepe-by-cuisine/:cuisine',expressAsyncHandler(async(req,res)=>{
    const cuisineFromUrl=req.params.cuisine;
    const reciepeList=await reciepeCollectionObj.find({cuisine:cuisineFromUrl},{status:true}).toArray();
    if(reciepeList==null){
        return res.send({message:"no reciepes"})
    }
    return res.send({message:"reciepe by cuisine",payload:reciepeList});
}))

userApp.post('/likestatus/:reciepeId',expressAsyncHandler(async(req,res)=>{
    const idFromUrl = Number(req.params.reciepeId);
    const { username } = req.body; 
    console.log(username);
    try {
        // Check if recipe exists
        let dbReciepe = await reciepeCollectionObj.findOne({ reciepeId: idFromUrl });
        if (!dbReciepe) {
            return res.status(404).send({ message: "Recipe not found" });
        }
        console.log(dbReciepe);
        // Check if the recipe has already been liked by the user
        const alreadyLikedIndex = dbReciepe.likes.findIndex(like => like.username === username);
        if (alreadyLikedIndex !== -1) {
            return res.send({message:"already liked"})
        }else{
            return res.send({message:"not liked"})
        }
    }catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
}))

// LIKE BY RECIEPE ID and username
userApp.post('/like/:reciepeId', expressAsyncHandler(async (req, res) => {
    const idFromUrl =Number(req.params.reciepeId);
    const { username } = req.body; // Extract username from req.body

    try {
        // Check if recipe exists
        let dbReciepe = await reciepeCollectionObj.findOne({ reciepeId: idFromUrl });
        console.log(dbReciepe);
        if (!dbReciepe) {
            return res.status(404).send({ message: "Recipe not found" });
        }

        // Check if the recipe has already been liked by the user
        const alreadyLikedIndex = dbReciepe.likes.findIndex(like => like.username === username);
        if (alreadyLikedIndex !== -1) {
            // If already liked, remove the like
            dbReciepe.likes.splice(alreadyLikedIndex, 1);
            await reciepeCollectionObj.updateOne({ reciepeId: idFromUrl }, { $set: { likes: dbReciepe.likes } });
            return res.send({ message: "unliked", payload: dbReciepe.likes });
        }

        // If not already liked, add the like
        dbReciepe.likes.unshift({ username: username });
        await reciepeCollectionObj.updateOne({ reciepeId: idFromUrl }, { $set: { likes: dbReciepe.likes } });
        return res.send({ message: "liked", payload: dbReciepe.likes });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
}));


// GET THE FAVOURITES OF A USER
userApp.get('/fav-reciepes/:username',expressAsyncHandler(async(req,res)=>{
    const usernameFromUrl=req.params.username;
    let reciepeList=await reciepeCollectionObj.find({likes:{$all:[{username:usernameFromUrl}]}}).toArray()
    console.log(reciepeList);
    if(reciepeList==null){
        return res.send({message:"No favourites"});
    }
    return res.send({message:"favourite reciepes",payload:reciepeList});
}))
// EDIT HIS OWN RECIEPES
userApp.put('/reciepe/:reciepeId',expressAsyncHandler(async(req,res)=>{
    const reciepeIdFromUrl=req.params.reciepeId;
    const editedReciepe=req.body;
    let latestReciepe=await reciepeCollectionObj.findOneAndUpdate({reciepeId:reciepeIdFromUrl},{$set:{...editedReciepe}},{returnDocument:'after'})
    res.send({message:"reciepe edited",payload:latestReciepe})
}))

//DELETE RECIEPE
userApp.put('/reciepe-del/:reciepeId',expressAsyncHandler(async(req,res)=>{
    let reciepeIdFromUrl=Number(req.params.reciepeId)
    let reciepe=req.body;
    if(reciepe.status==true){
    let result = await reciepeCollectionObj.updateOne({reciepeId:reciepeIdFromUrl},{$set:{status:false}})
    if(result.modifiedCount==1){
        return res.send({message:"reciepe deleted"})
    }
    }
    if(reciepe.status==false){
        let result=await reciepeCollectionObj.updateOne({reciepeId:reciepeIdFromUrl},{$set:{status:true}})
        if(result.modifiedCount==1){
            return res.send({message:"reciepe restored"});
        }
    }
}))




module.exports=userApp;