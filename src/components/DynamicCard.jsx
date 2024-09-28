import React from 'react';

const DynamicCard = ({title,data }) => {
    if (!data) {
        return <div className="bg-white p-4 rounded-lg shadow-md">Loading...</div>;
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md m-2">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            {/* <p>{data}</p> */}
            <div dangerouslySetInnerHTML={{ __html: data }} />
        </div>
    );
};

export default DynamicCard;
