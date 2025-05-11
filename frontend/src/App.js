import React from "react";
// import {Route,Routes} from "react-router-dom";
import {Routes,Route} from 'react-router-dom';
import Dash from "./components/Dash";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserDash from "./components/UserDash";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dash/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/userdash" element={<UserDash/>}/>
      </Routes>
    </div>
  );
}

export default App;
