import React from 'react';
import WorkImage from '../../assets/images/WorkInProgres.jpeg';

export default function InProgress() {
    return (
        <div className='flex flex-col items-center mt-20'>
            <img className='h-50 w-50' src={WorkImage} alt='Work in Progress' />
            <div className='mt-4 dark:text-white'>Work In Progress...</div>
        </div>
    );
}
