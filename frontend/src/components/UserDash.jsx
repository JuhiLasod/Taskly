import React,{useState} from "react";
function UserDash(){
    const [add,setAdd]=useState(false);
    const [task,setTask]=useState('');
    const [duedate,setDuedate]=useState('');
    const [message,setMessage]=useState('');
    const handleAdd=async()=>{
        const email=localStorage.getItem("email");
        const res=await fetch("http://localhost:8000/api/auth/addtask",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email,task,duedate})
        }
        );
        const text=await res.text();
        setMessage(text)
    };
    return(
        <div>
            this is dash for users
            <button onClick={()=>{setAdd(true)}}>add task</button>
            <div>
                {(add) && (
                    <div>
                        <div>task name</div>
                        <input type="text" 
                            value={task} 
                            onChange={(e)=>{setTask(e.target.value)}}
                        />
                        <div>task duedate</div>
                        <input type="date" 
                            value={duedate} 
                            onChange={(e)=>{setDuedate(e.target.value)}}
                        />
                        <button onClick={handleAdd}>add task</button>
                        <div>{message}</div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default UserDash;