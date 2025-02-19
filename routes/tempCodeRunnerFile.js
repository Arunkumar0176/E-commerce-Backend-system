        let userEmail = await user_model.findOne({email:email})
        if(userEmail){
            console.log("email already exist")
            return 
        }