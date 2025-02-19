//this will be the starting file 
const express = require("express")
const mongoose = require("mongoose")
const app = express()
// const server_config = require("./configs/server.configs")
// import { PORT } from "../configs/server.configs"
const server_config= require("../configs/server.configs");
const db_config = require("../configs/db.config")
// const user_model = require("../model/user.model")
const user_model=require("../model/user.model");
const bcrypt = require("bcryptjs")

app.use(express.json())

//connection with mongodb
mongoose.connect(db_config.DB_URL)
const db = mongoose.connection

db.on("error", ()=>{
    console.log("error while mongodb connection failed")
})
db.once("open",()=>{
    console.log("mongodb connection is successful")
    init() //its help to initilize the database
})

async function init(req,res){
    try{
        let user = await user_model.findOne({userId : "admin"})

        if(user){
            console.log("user already exist")
             return 
        }
    }catch(err){
        console.log("Error while reading the data",err)
    }

    try{
        user = await user_model.create({
           name : "Arunk",
           userId : "admin",
           userType : "ADMIN",
           email : "arungupta55@gmail.com", 
           password : bcrypt.hashSync("welcome1",8) //passward+Random text = becrypt , it help to sequre the system 
        })

        console.log("Admin created",user)

   }catch(err){
       console.log("user already register");
   }
}
//stich the route to the server 

// require(".auth.routes")(app)
require("./auth.routes")(app)

// require("/routes/category.routes")(app)
require("./category.routes")(app)

//start the server
app.listen(server_config.PORT, ()=>{
    console.log("server is running on port NUMBER : ",server_config.PORT)
})