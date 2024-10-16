import React from 'react';

const NewBadge = ({
    mainClass = "",
    subClassName1 = "",
    subClassName2 = "",
    text = "",
}) => {
    return (
        <div className={`flex items-center rounded-full vhcenter gap-1 px-2 py-0.5 w-fit h-fit ${mainClass}`}>
            <span className={`inline-block rounded-full size-1.5 2xl:size-2 ${subClassName1}`}></span>
            <span className={`${subClassName2}`}>{text}</span>
        </div>
    );
};

export default NewBadge;
