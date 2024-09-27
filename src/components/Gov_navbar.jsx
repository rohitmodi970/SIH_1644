import React from 'react'

const Gov_navbar = () => {
    return (
        <>
            

            <div className="flex w-full m-2 px-10 justify-evenly max-lg:hidden">
                <ul>
                    <li className='flex  gap-12'>
                        <div className="flex ">

                            <img src="public/images/emblem-dark.png" alt="" />
                            <div className="flex flex-col text-2xl justify-center">

                                <span>कोयला मंत्रालय </span>
                                <span className='font-bold'> Ministry of Coal</span>
                            </div>
                        </div>
                        
                            <img className='max-xl:hidden' src="public/images/cmsms.png" alt="" />
                            <img className='max-xl:hidden' src="public/images/pmgatisakti.png" alt="" />
                            <img className='max-xl:hidden' src="public/images/coalblock1.jpeg" alt="" />
                            <img className='max-xl:hidden' src="public/images/wtsa_logo.png" alt="" />
                            <img className='max-xl:hidden' src="public/images/swach-bharat.png" alt="" />
                        
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Gov_navbar
