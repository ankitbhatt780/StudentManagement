import React, { useEffect } from "react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
 
function Logout() {
  const navigate = useNavigate();
  React.useEffect(()=>{
    Logout()
  })
 
  function Logout(){
    let token = Cookie.get("token");
    Cookie.remove("token", { path:"/"});
    Cookie.remove("user", { path:"/"});
    if(!token){
        navigate("/adminlogin");

    }
  }
  
  return (
    <div onClick={Logout}>
     
    </div>
  );
}

export default Logout;
