import React from "react";
import bankImg from "../../../images/birla_groww.png";
import { SlOptionsVertical } from "react-icons/sl";
const Fund = ({ image, category, risk, returns, name, id }) => {
  return (
    <div className="flex transition-[all.5s] group hover:scale-[1.009] justify-between">
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
          <h1 className="text-white font-medium text-[0.9vw]">{returns}</h1>
          <p className="font-medium mt-1 text-center text-[0.8vw]">
            <span>1y</span>
          </p>
        </div>
        <div > 
          <span className="text-[#2e2e2e] cursor-pointer hover:text-white">
            <SlOptionsVertical />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Fund;
