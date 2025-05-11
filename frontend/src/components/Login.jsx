import React from "react";
import { useNavigate } from "react-router-dom";
function Login (){
    const navigate=useNavigate();
    const handleSignup=()=>{
        navigate("/signup");
    };
    return (
        <div>
            this is login page
            <button onClick={handleSignup}>sign up</button>
        </div>
    );
}
export default Login;