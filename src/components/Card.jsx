import React from "react";

const Card = ({ title, content, preventiveMeasures, bgColor }) => {
  // Split preventive measures string by '<br>' to create an array
  const formattedPreventiveMeasures = typeof preventiveMeasures === 'string'
    ? preventiveMeasures.split('<br>').filter((measure) => measure.trim() !== '') // Split and remove empty items
    : [];

  return (
    <div className={`flex flex-col ${bgColor} h-auto p-4 w-full rounded-2xl  justify-center transform transition-transform duration-300 hover:scale-105`}>
      <h3 className="text-2xl font-bold text-center">{title}</h3>
      <p className="text-lg font-mono mt-2 " dangerouslySetInnerHTML={{ __html: content }}></p>
    </div>
  );
};

export default Card;




