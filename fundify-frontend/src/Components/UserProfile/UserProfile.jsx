import React, { useContext, useEffect, useRef, useState } from "react";
import avatar from "../../images/avatar.svg";
import { UserContext } from "../../context/User/UserContext";
import { CiLogin } from "react-icons/ci";
import { LoginContext } from "../../context/Login/LoginContext";
import { Modal, notification } from "antd";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SlOptionsVertical } from "react-icons/sl";
const UserProfile = () => {
  const { user, isHidden, setIsHidden } = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const[hide,setHide]=useState(true)

  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsHidden(true);
      setHide(true)
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside, true);
    return () => {
      document.body.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const getUsers = () => {
    axios
      .get("http://localhost:8000/users/get-users")
      .then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
    showModal();
  };
  const updateUser=(id)=>{
    
  }
  const deleteUser=(id)=>{

  }
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
          {/* {user.role === "admin" && isLoggedIn && (
            <div
              onClick={getUsers}
              className="flex gap-2 py-3 px-4 cursor-pointer  text-white text-[0.98vw] items-center"
            >
              <span className="text-[1.5vw] font-bold text-[#4e4d4d]">
                <FaUsers />
              </span>
              Users
            </div>
          )} */}
          <div
            onClick={() => {
              localStorage.clear();
              setIsLoggedIn(false);
              setIsHidden(true);
              navigate("/login");
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
      <div>
        <Modal
          title="Users"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {users.map((u, i) => (
            <div key={i} className="relative border  border-[#2e2e2e]">
              <div className="header p-6  w-full flex items-center justify-between  gap-4">
                <div className="header  flex items-center  gap-4">
                  <div
                    title={`${u.user_name}`}
                    className="w-[2.5vw] cursor-pointer"
                  >
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-white capitalize font-medium text-[1.2vw]">
                      {u.user_name} &nbsp;
                    </h1>
                  </div>
                </div>
                {user.role === "admin" && (
                  <div
                    className="self-end"
                    onClick={(user) => {
                      setHide(!hide);
                    }}
                  >
                    <span className="text-[#2e2e2e] cursor-pointer hover:text-white">
                      <SlOptionsVertical />
                    </span>
                  </div>
                )}
                 <div
          className={`w-[10vw] ${
            hide ? "hidden" : "block"
          } rounded border absolute right-[-15%] bg-[#121212] top-[-26%] z-[99] border-gray-500`}
        >
          <button
            onClick={() => updateUser(u.id)}
            className="border-b text-gray-400 relative z-[10] block w-full border-gray-500 p-3 transition-all transition-duration-800 active:scale-[.96]"
          >
            Update  
          </button>
          <button
            onClick={() => deleteUser(u.id)}
            className="p-3 text-gray-400 transition-all transition-duration-800 active:scale-[.96] text relative z-[10] block w-full"
          >
            Delete
          </button>
        </div>
              </div>
            </div>
          ))}
        </Modal>
      </div>
    </div>
  );
};

export default UserProfile;
