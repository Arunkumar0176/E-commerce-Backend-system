const category_model = require("../model/category.model")

//controler for creating the category
// post localhost:8080
/*
    {
"name": "Household",
"description" : "This will have all the household items"
    }
*/

exports.createNewCategory = async(req, res)=>{
    
    //Read the req body

    //Create the category object
    const cat_data = {
        name : req.body.name,
        description : req.body.description
    }
    try{
            //insert into mongodb
    const category = await category_model.create(cat_data)
    return res.status(201).send(category)
    }catch(err){
        console.log("Error while creation the category",err)
        res.status(500).send({
            message : "Error while creating the category"
        })
    }
  
    //Insert the response of the crerated
}

