// Card.js
import React from "react";

const Card = ({ title, percentage, children }) => {
  return (
    <div className="flex flex-col bg-slate-300 h-[40vh] w-[20vw] rounded-2xl text-center justify-center">
      <h3 className="text-lg font-semibold text-gray-700 ">{title}</h3>
      <p className="text-3xl font-bold text-green-500 mt-4">{percentage}</p>
      {children && <div className="mt-2 text-gray-500">{children}</div>}
    </div>
  );
};

export default Card;


