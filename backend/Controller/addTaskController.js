import Task from "../Models/TaskOuter.js"
export const addTaskController=async(req,res)=>{
    try{
    const {email,task,duedate}=req.body;
    const newTask = {
        task,
        duedate: new Date(duedate),
        status: false
      };
  
      const updatedUser = await Task.findOneAndUpdate(
        { email },
        { $push: { tasks: newTask } },
        { new: true, upsert: true } // Create doc if not exists
      );
      res.send("success");
    }catch(err)
    {
        res.send("failed");
    }
    // const newTask=new TaskInner();
    // await TaskInner.save();
    // const email=localStorage.getItem();
    //at this mail id in db find add above task to existing task list

}