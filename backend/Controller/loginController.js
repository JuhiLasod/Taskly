import User from "../Models/User.js";

export const loginController=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email})
    if(user)
    {
        const userpass=await User.findOne({email,password})
        if(userpass)
        {
            res.send("success");
        }
        else{
            res.send("invalid password")
        }
        
    }
    else{
        res.send("user do not exists");
    }
    
}