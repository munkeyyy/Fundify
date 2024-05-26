import React, { useState } from "react";
import loginBg from "../../images/loginbg.svg";
import patternBg from "../../images/patternimg.svg";
import logo from "../../images/logo.png";
import Login from "../Login/Login";
import Register from "../Register/Register";

const Auth = () => {
    const[ischanged, setIsChanged]=useState(false)
  return (
    <div
      style={{ backgroundImage: `url(${loginBg})` }}
      className="min-h-screen p-4 flex items-center bg-cover flex-col gap-10"
    >
      <div className="logo w-[8.5vw]">
        <img src={logo} className="h-full w-full object-cover" alt="logo" />
      </div>

      <div className="flex items-center">
        <div
          style={{ backgroundImage: `url(${patternBg})` }}
          className="h-[35vw] w-[30vw] bg-cover flex items-center justify-center rounded-l-md overflow-hidden p-4"
        >
          <h1 className="text-white font-semibold text-[2vw]">Simple, Free Investing</h1>
        </div>
        <div className=" h-[35vw] w-[30vw] rounded-r-md overflow-hidden">
         {ischanged? <Register setIsChanged={setIsChanged}/>:<Login setIsChanged={setIsChanged} />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
