

// import React from "react";

// const Card = ({ title, content }) => {
//   return (
//     <div className="flex flex-row  bg-slate-300 h-auto p-4 w-[20vw] rounded-2xl text-center justify-center">
//       <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
//       <p className="text-md text-gray-600 mt-2">{content}</p>
//     </div>
//   );
// };

// export default Card;
import React from "react";

const Card = ({ title, content, preventiveMeasures, bgColor }) => {
  // Split preventive measures string by '<br>' to create an array
  const formattedPreventiveMeasures = typeof preventiveMeasures === 'string'
    ? preventiveMeasures.split('<br>').filter((measure) => measure.trim() !== '') // Split and remove empty items
    : [];

  return (
    <div className={`flex flex-col ${bgColor} h-auto p-4 w-full rounded-2xl text-center justify-center`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-md mt-2" dangerouslySetInnerHTML={{ __html: content }}></p>
      <p className="text-md mt-2">
        <strong>Preventive Measures:</strong>
        <ul className="list-disc mt-2 pl-4 text-left">
          {formattedPreventiveMeasures.length > 0 ? (
            formattedPreventiveMeasures.map((measure, idx) => (
              <li key={idx}>{measure}</li>
            ))
          ) : (
            <li>{preventiveMeasures}</li> 
          )}
        </ul>
      </p>
    </div>
  );
};

export default Card;




