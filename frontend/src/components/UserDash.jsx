import React,{ useCallback, useEffect, useState} from "react";
function UserDash(){
    const [add,setAdd]=useState(false);
    const [task,setTask]=useState('');
    const [duedate,setDuedate]=useState('');
    // const [index,setIndex]=useState('0');
    // const [message,setMessage]=useState('');
    const [data,setData]=useState([]);
    const [edit,setEdit]=useState('');
    // const [choice,setChoice]=useState('');

    const email=localStorage.getItem("email");
    
    const fetchTasks=useCallback(async()=>{
        const res=await fetch("http://localhost:8000/api/auth/loadtask",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email})
        });
        const tasks=await res.json();
        setData(tasks);
    },[email]);
    
    useEffect(()=>{fetchTasks()},[fetchTasks]);
    // useEffect(()=>{console.log(index)},[index]);
    
        
    const handleAdd=async()=>{
        // const i=index++;
        // setIndex(prev=>String(Number(prev)+1));
        // console.log(index);
        const res=await fetch("http://localhost:8000/api/auth/addtask",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, task, duedate})
        }
        );
        const text=await res.text();
        // setMessage(text);
        alert(text);
        fetchTasks();
        setAdd(false);
        setTask('');
        setDuedate('');
    };
    const handleDelete = async(_id) => {
            const c='2';
            const result = window.confirm("Are you sure you want to delete this task?");
            if (result) {
                const res=await fetch("http://localhost:8000/api/auth/edit",{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({_id,email,choice: c})
                });
                const text=await res.text();
                fetchTasks();
                if(text!=="success"){
                alert("successfully deleted");
                console.log("Task deleted");
                }
            } else {
                // Cancel clicked
                console.log("deletion cancelled");
            }
        };
    const handleEditStatus=async(_id)=>{
        const c='1'
        const result=window.confirm("are you sure you want to update the task status?");
        if(result)
        {  
        const res=await fetch("http://localhost:8000/api/auth/edit",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({_id,email,choice: c})
        });
        const text=await res.text();
        fetchTasks();
        // console.log(_id);
        if(text!=="success"){
        // setChoice('');
        
        alert("status successfully updated to completed");
        console.log("updated");
        }
        }
        else{
            console.log("updation cancelled");
        }

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
                        
                        
                    </div>
                )}
            </div>
            <div>
                        {Array.isArray(data) && data.length > 0 ? (
                        data.map((t, i) => (
                        <div key={i} style={{ border: '1px solid gray', margin: '5px', padding: '5px' }}>
                            <strong> {t.task}</strong> - Due: {new Date (t.duedate).toLocaleDateString()}
                            <div>Status: {t.status ? "✅ Done" : "❌ Pending"}</div>
                            <button onClick={()=>setEdit(i)}>edit</button>
                            <div>
                                {(edit===i) && (
                                    <div>
                                        <button onClick={()=>handleDelete(t._id)}>delete</button>
                                        <div>{(!t.status) && (<button onClick={()=>handleEditStatus(t._id)}>edit status</button>)}</div>
                                    </div>)
                                }
                            </div>
                        </div>
                        ))
                        ) : (<p>No tasks found.</p>)}
            </div>
        </div>
    );
};
export default UserDash;