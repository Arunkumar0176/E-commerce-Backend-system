 //post localhost:8888/ecomm/api/v1/auth/signup

 //i need to intercept this

 // app -> routes -> controller 

 //connect with model controller and routes after that connect app server

//  const authController = require("../controllers/auth.controller")
const authController = require("../controllers/auth.controller")

const authMW = require("../middlewares/auth.mw")

 module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authMW.verifySignUpBody], authController.signup)

    //route for
    //post http://localhost:8888/ecomm/api/v1/auth/signin

    app.post("/ecomm/api/v1/auth/signin",[authMW.verifySignInBody],authController.signin)
 }