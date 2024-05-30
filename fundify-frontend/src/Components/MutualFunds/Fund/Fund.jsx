import React, { useContext, useEffect, useRef, useState } from "react";
import bankImg from "../../../images/birla_groww.png";
import { SlOptionsVertical } from "react-icons/sl";
import { Modal, message, notification } from "antd";
import UpdateSip from "../UpdateSip/UpdateSip";
import axios from "axios";
import { UserContext } from "../../../context/User/UserContext";
const Fund = ({ image, category, risk, returns, name, id, setSips, sips }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sip, setSip] = useState({});
  const{user}=useContext(UserContext)

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
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const updateSip = (id) => {
    showModal();
    axios
      .get(`http://localhost:8000/sips/get-sip/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setSip(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const deleteSip = (id) => {
    axios
      .delete(`http://localhost:8000/sips/delete-sip/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setSips(sips.filter((data)=>data._id!==id))
        notification.success({ message: res.data.message });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div
        ref={containerRef}
        className="flex relative transition-[all.5s] group   justify-between"
      >
        <div className="flex items-start gap-8">
          <div className="img p-1 rounded-md bg-white w-[2.8vw]">
            <img
              onError={(e) => {
                e.currentTarget.src =
                  "https://assets-netstorage.groww.in/mf-assets/logos/birla_groww.png";
              }}
              src={`http://localhost:8000/uploads/sips/${image}`}
              alt="img"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-white font-medium group-hover:text-[#09AF45] text-[0.9vw]">
              {name}
            </h1>
            <p className="font-medium mt-1 capitalize text-[0.8vw]">
              <span>{risk}</span> &nbsp;• &nbsp;<span>{category}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-white font-medium relative  text-[0.9vw]">
              {returns}
            </h1>
            <p className="font-medium mt-1 text-center text-[0.8vw]">
              <span>1y</span>
            </p>
          </div>
          {user.role==="admin"&&<div
            onClick={() => {
              setIsHidden(!isHidden);
            }}
          >
            <span className="text-[#2e2e2e] cursor-pointer hover:text-white">
              <SlOptionsVertical />
            </span>
          </div>}
        </div>
        <div
          className={`w-[10vw] ${
            isHidden ? "hidden" : "block"
          } rounded border absolute right-0 bg-[#121212] top-[90%] z-[99] border-gray-500`}
        >
          <button
            onClick={() => updateSip(id)}
            className="border-b relative z-[10] block w-full border-gray-500 p-3 transition-all transition-duration-800 active:scale-[.96]"
          >
            Update
          </button>
          <button
            onClick={() => deleteSip(id)}
            className="p-3 transition-all transition-duration-800 active:scale-[.96] text relative z-[10] block w-full"
          >
            Delete
          </button>
        </div>
      </div>
      <Modal
        title="Update SIP"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UpdateSip
          sipName={sip.name}
          sipCat={sip.category}
          sipRisk={sip.riskLevel}
          sipDesc={sip.description}
          sipReturns={sip.returns}
          sipImg={"http://localhost:8000/uploads/sips/" + sip.image}
          sipId={sip._id}
        />
      </Modal>
    </div>
  );
};

export default Fund;
