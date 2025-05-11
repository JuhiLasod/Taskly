import React, { useState } from "react";
// import { useState } from "react";
function Signup(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState('');
    const handleEmail=(e)=>{
        setEmail(e.target.value);
    };
    
    const handlePassword=(e)=>{
        setPassword(e.target.value);
    };
    const handleSignup=async()=>{
        const res=await fetch("http://localhost:8000/api/auth/signup",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        }

        );
        const text= await res.text();
        setMessage(text);

    }
    // const res = await fetch("https://login-page-9.onrender.com/api/auth/login", {
    //     // const res = await fetch("http://localhost:8000/api/auth/login", {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ username, password })
    //     });
    return(
        
        <div>
            this is sign up page
            <div>enter mail id</div>
            <div>
                <input type="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="email"
                />
            </div>
            <div>enter password</div>
            <div>
                <input type="password"
                    value={password}
                    onChange={handlePassword}
                    placeholder="password"
                />
            </div>
            <button onClick={handleSignup}>signup</button>
            <div>{message}</div>
        </div>
    );
}
export default Signup;