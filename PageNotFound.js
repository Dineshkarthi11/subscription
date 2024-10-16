import React from 'react'
import LostKeys from "../../assets/images/Lost Keys-big.png"

const PageNotFound = () => {
    return (
        <div className=" flex flex-col gap-2 items-center justify-center h-screen">
            <img src={LostKeys} alt='Img' className='w-40 h-40 md:w-44 md:h-44 2xl:w-56 2xl:h-56 opacity-60 dark:opacity-100'/>
            <div>
                <p className='text-xs 2xl:text-sm dark:text-white opacity-60'>This page could not be found !</p>
            </div>
        </div >
    )
}

export default PageNotFound