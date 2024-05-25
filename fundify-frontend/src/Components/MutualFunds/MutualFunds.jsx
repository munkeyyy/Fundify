import React, { useEffect, useState } from "react";
import Fund from "./Fund/Fund";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
const MutualFunds = () => {
  const [sips, setSips] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/sips/get-sip")
      .then((res) => {
        console.log(res.data);
        setSips(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="py-6">
      <div className="max-w-[1110px] mx-auto ">
        <div className=" flex items-center justify-between">
          <h1 className="text-white text-[1.5vw] font-sans font-medium">
            All Mutual Funds
          </h1>
          <button className="py-2 flex items-center gap-2 font-semibold px-4  cursor-pointer text-white rounded-md mt-4 bg-[#02B386]">
            ADD SIP
            <span className="text-white text-lg">

            <FaPlus />
            </span>
          </button>
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
