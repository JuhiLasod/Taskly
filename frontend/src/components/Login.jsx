import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
function Login (){
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState('');
    const handleSignup=()=>{
        navigate("/signup");
    };
    const handleLogin=async()=>{
        const res=await fetch("http://localhost:8000/api/auth/login",{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password})
        });
        const text=await res.text();
        if(text==="success")
        {
            navigate("/userdash");
        }
        else{
            setMessage(text)
        }
        
    };
    return (
        <div>
            this is login page
            <div>
                <label>email</label>
                <input type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>password</label>
                <input type="text"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin}>login</button>
            <div>{message}</div>
            <button onClick={handleSignup}>sign up</button>
        </div>
    );
}
export default Login;