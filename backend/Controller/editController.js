import Task from "../Models/TaskOuter.js";
export const editController=async(req,res)=>{
    try{
    const {email,choice}=req.body;
    const user=await Task.findOne({email});
    if(choice==='1')
    {
        
        res.send("res from  edit status controller");
    }
    else{
        res.send("res from  delete  controller");
    }
    }
    catch(err){
        res.send("error");
    }
};