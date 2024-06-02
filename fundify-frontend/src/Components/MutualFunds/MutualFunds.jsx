import React, { useContext, useEffect, useState } from "react";
import Fund from "./Fund/Fund";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { UserContext } from "../../context/User/UserContext";
import { LoginContext } from "../../context/Login/LoginContext";
import { Modal } from "antd";
import AddSip from "./AddSip/AddSip";
const MutualFunds = () => {
  const [sips, setSips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    axios
      .get("http://localhost:8000/sips/get-sip")
      .then((res) => {
        console.log(res.data);
        setSips(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const { user } = useContext(UserContext);
  const { isLoggedIn } = useContext(LoginContext);
  const handleUpdatesip = (updatedSip) => {
    setSips((prevSips) =>
      prevSips.map((sip) =>
        sip.id === updatedSip.id ? updatedSip : sip
      )
    );
  };

  return (
    <div className="pt-4 py-8">
      <div className="max-w-[1110px] mx-auto ">
        <div className=" flex items-center justify-between">
          <h1 className="text-white text-[1.5vw] font-sans font-medium">
            All Mutual Funds
          </h1>
          {user.role === "admin" && isLoggedIn && (
            <div>
              <button onClick={showModal} className="py-2 transition-all duration-100 active:scale-[.95] flex items-center gap-2 font-semibold px-4  cursor-pointer text-white rounded-md mt-4 bg-[#02B386]">
                ADD SIP
                <span className="text-white text-lg">
                  <FaPlus />
                </span>
              </button>
              <Modal title="ADD SIP" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <AddSip setSips={setSips} sips={sips} setIsModalOpen={setIsModalOpen}/>
              </Modal>
            </div>
          )}
        </div>

        <div className="mt-14">
          <div className=" border  border-[#2e2e2e]">
            {sips.map((elem, i) => (
              <div key={i} className="p-4 border-b border-[#2e2e2e]">
                <Fund
                  category={elem.category}
                  image={elem.image}
                  name={elem.name}
                  returns={elem.returns}
                  risk={elem.riskLevel}
                  id={elem._id}
                  setSips={setSips}
                  sips={sips}
                  onUpdate={handleUpdatesip}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutualFunds;
