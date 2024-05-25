import React, { useState } from "react";
import logo from "../../../images/logo.png";
import { IoMdSearch } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { AiOutlineBell } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";

const Navbar = () => {
  const [isChanging, setIsChanging] = useState(false);
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setIsChanging(true);
    } else {
      setIsChanging(false);
    }
    setValue(e.target.value);
  };
  return (
    <div className="py-4 border-b border-[#2e2e2e]">
      <div className="max-w-[1110px] mx-auto  flex items-center gap-8 justify-betweeen">
        <div className="logo w-[8.5vw]">
          <img src={logo} className="h-full w-full object-cover" alt="logo" />
        </div>
        <div>
          <p className="text-[1.06vw] text-white font-medium active:text-[#0abb92]">
            Explore
          </p>
        </div>
        <div>
          <p className="text-[1.06vw] text-white font-medium active:text-[#0abb92]">
            Investments
          </p>
        </div>
        <div className="search w-[25vw] flex items-center gap-3 p-2 mx-4 border rounded-md border-[#2e2e2e]">
          <span className="text-xl text-[#f8f8f8]">
            <IoMdSearch />
          </span>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            value={value}
            placeholder="What are we looking for today?"
            className=" caret-[#0abb92] text-white placeholder:text-[#f8f8f8]   w-full  focus-visible:outline-none "
          />
          {isChanging && (
            <button
              onClick={() => {
                setValue("");
                setIsChanging(false);
              }}
              className="text-2xl text-[#f8f8f8]"
            >
              <IoIosClose />
            </button>
          )}
        </div>
        <div className="flex items-center  gap-9">
          <div className="text-2xl cursor-pointer active:text-[#0abb92]">
            <AiOutlineBell />
          </div>
          <div className="text-2xl cursor-pointer active:text-[#0abb92]">
            <IoWalletOutline />
          </div>
          <div className="text-2xl cursor-pointer active:text-[#0abb92]">
            <BsCart2 />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
