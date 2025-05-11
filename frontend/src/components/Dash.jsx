import React from "react";
import { useNavigate } from "react-router-dom";

function Dash(){
    const navigate=useNavigate();
    const handlebtnclick=()=>{
        navigate("/login");
    };
    return (
        <div>
            this is dashboard 
            <button onClick={handlebtnclick}>login to contiue</button>
        </div>
    );
}
export default Dash;