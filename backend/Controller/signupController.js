// import express from 'express';
import User from "../Models/User.js";
export const signupController=async(req,res)=>{
    const {email,password}=req.body;
    try{
        
        const existing=await User.findOne({email,password});
        if(existing)
        {
            res.send("already exists");
        }
        else
        {
            const newUser=new User({email,password});
            await newUser.save();
            console.log("sign up successfull")
            res.send("success")
        }
    }
    catch(err){
        console.log("sign up successfull")
        res.send("fail");
    }
    
    console.log(email);
    console.log(password);
    // res.send("everything is successfully recieved at backend");
};