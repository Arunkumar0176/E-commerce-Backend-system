const user_model = require("../model/user.model")

const jwt = require("jsonwebtoken")
const auth_config = require("../configs/auth.config")
//create a mw will check if the requenst body is proper  and correct 

const verifySignUpBody = async(req, res, next)=>{
    try{
        //check for the name 
          if(!req.body.name){
            return res.status(400).send({
                message : "Failed ! Name was not provide in request body"
            })
          }
        //check for the email
        if(!req.body.email){
            return res.status(400).send({
                message : "Failed ! Email was not provide in request body"
            })
          }
        //check for the userid 
        if(!req.body.userId){
            return res.status(400).send({
                message : "Failed ! userId was not provide in request body"
            })
          }
        //check if the user with the name userId is already present 
         
          const user = await user_model.findOne({userId : req.body.userId})
          if(user){
          return res.status(400).send({
            message : "failed ! user with same userId is already present"
          })
        }
        next();
    }catch(err){
        console.log("Error while validating the request object",err)
        res.status(500).send({
            message : "Error while validating the request body"
        })
    }
}

const verifySignInBody = async(req, res, next)=>{
    if(!req.body.userId){
      return res.status(400).send({
        message : "userid is not provided"
      });
    }
    if(!req.body.password){
      return res.status(400).send({
        message : "password is not provided"
      });
    }
    next();
  }  
   
    const verifyToken = (req , res, next)=>{
      //check if the token is present in the header
     const token = req.headers['x-access-token']

     if(!token){
      return res.status(403).send({
        message : "No token provided : UnAuthorized"
      })
     }
      //if its the valid token

       jwt.verify(token,auth_config.secret , async(err, decoded)=>{
        if(err){
          return res.status(401).send({
            message : "UnAuthorized !"
          })
        }
        const user = await user_model.findOne({userId : decoded.id})
         if(!user){
          return res.status(400).send({
            message : "UnAuthorzed, this user for this token doesn't exist"
         })
        }
           //set the user info in the req body
         req.user = user
        next()
      })

      //then move to the next step
    }

    const isAdmin = (req, res, next) => {
     const user = req.user
     if(user && user.userType == "ADMIN"){
      next()
     }else{
      return res.status(403).send({
           message : "omly ADMIN users are allowed to access this emppoint"
        })
      }
    
    }

module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody,
    verifyToken : verifyToken,
    isAdmin : isAdmin
}