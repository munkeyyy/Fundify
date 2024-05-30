import React, { useContext, useEffect, useRef } from "react";
import avatar from "../../images/avatar.svg";
import { UserContext } from "../../context/User/UserContext";
import { CiLogin } from "react-icons/ci";
import { LoginContext } from "../../context/Login/LoginContext";
import { notification } from "antd";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
  const { user, isHidden, setIsHidden } = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate()
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsHidden(true);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside, true);
    return () => {
      document.body.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="relative " ref={containerRef}>
      <div
        title="profile"
        onClick={() => {
          setIsHidden(!isHidden);
        }}
        className="w-[2.5vw] cursor-pointer"
      >
        <img src={avatar} alt="avatar" className="h-full w-full object-cover" />
      </div>
      <div
        className={`w-[23vw] bg-[#121212] absolute z-[99] right-[-40%] top-[125%] border border-[#2e2e2e] transition-all overflow-hidden rounded ${
          isHidden ? "hidden" : "block"
        }`}
      >
        <div className="header p-6 bg-[#1b1b1b] flex items-center gap-4">
          <div title={`${user.user_name}`} className="w-[2.5vw] cursor-pointer">
            <img
              src={avatar}
              alt="avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-white capitalize font-medium text-[1.2vw]">
              {user.user_name} &nbsp;
              {user.role === "admin" && (
                <span className="capitalize font-bold text-xs text-[#5a5959]">
                  {user.role}
                </span>
              )}
            </h1>
            <h1 className="text-white font-normal text-[1vw]">{user.email}</h1>
          </div>
        </div>
        <div>
          {user.role === "admin" && isLoggedIn && (
            <div className="flex gap-2 py-3 px-4 cursor-pointer  text-white text-[0.98vw] items-center">
              <span className="text-[1.5vw] font-bold text-[#4e4d4d]">
                <FaUsers />
              </span>
              Users
            </div>
          )}
          <div
            onClick={() => {
              localStorage.clear();
              setIsLoggedIn(false);
              setIsHidden(true);
              navigate("/login")
              notification.success({ message: "Logged out succesfully" });
            }}
            className="flex gap-2 py-3 px-4 cursor-pointer  text-white text-[0.98vw] items-center"
          >
            <span className="text-[1.5vw] font-bold text-[#4e4d4d]">
              <CiLogin />
            </span>
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
