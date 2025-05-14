import Task from "../Models/TaskOuter.js";
export  const loadTaskController=async(req,res)=>{
    try{const {email}=req.body;
    const tasks=await Task.findOne({email});
    // console.log(tasks.tasks);
    res.send(tasks.tasks);}
    catch(err){
        console.log("not okay");
    }
};