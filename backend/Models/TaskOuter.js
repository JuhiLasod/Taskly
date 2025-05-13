import mongoose from "mongoose";
const TaskInnerSchema=new mongoose.Schema({
    task:{type:String},
    status:{type:Boolean , default: false},
    duedate: {type: Date}
});
const TaskOuterSchema=new mongoose.Schema({
    email:{type: String, unique: true},
    tasks:{type: [TaskInnerSchema], default:[]}
});
export default mongoose.model("Task",TaskOuterSchema);