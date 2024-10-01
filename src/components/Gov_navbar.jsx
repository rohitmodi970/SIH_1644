import React from 'react'

const Gov_navbar = () => {
    return (
        <>
            

            <div className="flex w-full  px-10 justify-evenly max-lg:hidden p-2">
                <ul>
                    <li className='flex  gap-12'>
                        <div className="flex ">

                            <img src="/images/emblem-dark.png" alt="" />
                            <div className="flex flex-col text-2xl justify-center">

                                <span>कोयला मंत्रालय </span>
                                <span className='font-bold'> Ministry of Coal</span>
                            </div>
                        </div>
                        
                            <img className='max-xl:hidden' src="/images/cmsms.png" alt="cmsms" />
                            <img className='max-xl:hidden' src="/images/pmgatisakti.png" alt="pmgatisakti" />
                            <img className='max-xl:hidden' src="/images/coalblock1.jpeg" alt="coalblock1" />
                            <img className='max-xl:hidden' src="/images/wtsa_logo.png" alt="wtsa_logo" />
                            <img className='max-xl:hidden' src="/images/swach-bharat.png" alt="swach-bharat" />
                        
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Gov_navbar
