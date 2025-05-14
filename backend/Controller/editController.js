import Task from "../Models/TaskOuter.js";
export const editController=async(req,res)=>{
    try{
    const {_id,email,choice}=req.body;
    const user=await Task.findOne({email});
    if(choice==='1')
    {
        await Task.updateOne({"tasks._id": _id},
                            {$set:{"tasks.$.status":true}}
                        
        )//set satus to !status
        user.save();
        
        res.send("res from  edit status controller from ");
    }
    else{
        user.tasks.pull({_id: _id});
        await user.save();
        res.send("res from  delete  controller from "+_id);
    }
    }
    catch(err){
        res.send("error");
    }
};