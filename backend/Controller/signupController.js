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
            res.send("signup succ")
        }
    }
    catch(err){
        res.send("sign up unsucc");
    }
    
    console.log(email);
    console.log(password);
    // res.send("everything is successfully recieved at backend");
};