// i need to write controller / logic to reg. by a user
const bcrypt = require("bcryptjs")
// const user_model = require("../models/user.model")
const user_model=require("../model/user.model")
const jwt = require("jsonwebtoken")// session time  to store token
const secret = require("../configs/auth.config") // it 
exports.signup = async(req, res)=>{

    //logic to create the user
    //1. Read the request body
    const request_body =await req.body
    //2.insert the data in the user collection in mongoDb
       const userObj = {
        name : request_body.name,
        userId : request_body.userId,
        email : request_body.email,
        password : bcrypt.hashSync(request_body.password,8)
       }
        console.log("jskbdk",userObj);
       try{
           console.log("uswer obhj",userObj);
           const user_created = await user_model.create(userObj)
           //Return this user
           const res_obj = {
            name : user_created.name,
            userId : user_created.userId,
            email : user_created.email,
            userType : user_created.userType, //default customer
            createdAt : user_created.createdAt,
            updatedAt : user_created.updatedAt
           }

           res.status(201).send(res_obj)
       }catch(err){
        console.log("Error while reg. the user", err)
        res.status(500).send({
            message : "Error while reg. the user"
        })
       }
    //3.Return the Response back to the user 
}  
  exports.signin = async(req,res)=>{
    //check the user id is present in sysytem
    const user = await user_model.findOne({userId : req.body.userId})
    console.log("user", user);
    if(user == null){
      res.status(400).send({
        message : "User id passed is not a vali"
      })
    }
    //password is correct 
    //  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)
    console.log("password  nkljnef",req.body.password);
    console.log("password user",user.password);
     const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

     if(!isPasswordValid){
        return res.status(401).send({
            message : "Invalid password"
     })
    }
    //using jwt we create the access token with a given TTL and return
    const token = jwt.sign({id : user.userId}, secret.secret,{
    expiresIn : 120  //after the 120 sec its expire
    })

    res.status(200).send({
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        accessToken : token
    })
}