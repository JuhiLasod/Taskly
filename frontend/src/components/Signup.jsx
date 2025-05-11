import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
// import { useState } from "react";
function Signup(){
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState('');
    // const [signupres,setSignupres]=useState(false);
    const handleEmail=(e)=>{
        setEmail(e.target.value);
    };
    
    const handlePassword=(e)=>{
        setPassword(e.target.value);
    };
    const handleSignup=async()=>{
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                setMessage("Please enter a valid email address.");
                return;
            }
            const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{6,}$/;
            const cleanPassword = password.trim();
            console.log(cleanPassword);
            if (!passwordPattern.test(cleanPassword)) {
                setMessage("Password must contain at least one uppercase letter, one number, and one special character.");
                return;
            }
            else {
                console.log("Regex passed!");
            }
        const res=await fetch("http://localhost:8000/api/auth/signup",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        }

        );
        const text= await res.text();
        // if(text==="success")
        // {
        //     window.alert("sign up successfull");
        //     navigate("/login");
        // }
        // else{
        //     setMessage(text);
        // }
        if (text==="success") {
            Swal.fire({
              icon: 'success',
              title: 'Signed Up!',
              text: text, // Message from backend
              confirmButtonColor: '#3085d6'
            });
            navigate("/login");
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: text,
              confirmButtonColor: '#d33'
            });
          }
    

        

    }

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
            <div><button onClick={handleSignup}>signup</button>
            </div>
            <div>{message}</div>
        </div>
    );
}
export default Signup;