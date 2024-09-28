import React from 'react'
import { NavLink } from 'react-router-dom'

const Features = () => {
    return (
        <>
            <div className="flex justify-center items-center flex-col">

                <div className='text-green-700 text-3xl py-10'>F E A T U R E S</div>
                <div className="text-5xl font-bold text-green-500">Our Features & Services.</div>
                <div className="container flex gap-10 justify-center py-10 ">
                    <div className="w-[22vw] h-[60vh] bg-white rounded-2xl flex flex-col  items-center text-center gap-4">
                        <img className='w-60 top-0 h-96' src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/a17abde8d83650a582a28432/users-with-speech-bubbles-vector_53876-82250.jpg" alt="" />
                        <h1 className='font-bold text-green-600 text-2xl'>Safety & fire risk assessment</h1>
                        <p className='font-sans text-xl'>The API monitors safety by tracking levels of carbon monoxide, methane, and dust in coal mines. It evaluates risks, recommends evacuations when needed, and generates alerts for health issues like Black lung disease and silicosis if dust levels are too high.</p>
                        <NavLink
                        className='bg-green-700 text-white text-xl p-2 px-7 bottom-0 rounded-full hover:font-medium'
                            to="/carboncalculator"
                            onMouseEnter={() => handleHover('icon3', 'mouseenter')}
                            onMouseLeave={() => handleHover('icon3', 'mouseleave')}
                        >
                            Calculate
                        </NavLink>
                    </div>
                    <div className="w-[22vw] h-[60vh] bg-white rounded-2xl flex flex-col  items-center text-center gap-4">
                        <img className='w-60 top-0 h-96' src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/3b242447f922540fbe750cab/fdf.jpg" alt="" />
                        <h1 className='font-bold text-green-600 text-2xl'>Carbon Calculator</h1>
                        <p className='font-sans text-xl'>The XGBoost model predicts CO₂ and methane emissions using coal and energy data. The Flask API provides real-time predictions, calculates total carbon footprints, offers insights on tree offsets, and suggests sustainable solutions like modernization and methane storage to mitigate global warming.</p>
                        <NavLink
                        className='bg-green-700 text-white text-xl p-2 px-7 bottom-0 rounded-full  hover:font-medium'
                            to="/contact"
                            onMouseEnter={() => handleHover('icon3', 'mouseenter')}
                            onMouseLeave={() => handleHover('icon3', 'mouseleave')}
                        >
                            Calculate
                        </NavLink>
                    </div>
                    <div className="w-[22vw] h-[60vh] bg-white rounded-2xl flex flex-col  items-center text-center gap-4">
                        <img className='w-60 top-0 h-96' src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/8cc47b39e719570b996d9879/dsds.jpg" alt="" />
                        <h1 className='font-bold text-green-600 text-2xl'>Carbon Calculator</h1>
                        <p className='font-sans'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos dicta laborum labore ad autem ullam asperiores tenetur dolorum numquam veritatis?</p>
                        <NavLink
                        className='bg-green-700 text-white text-xl p-2 px-7 bottom-0 rounded-full hover:font-medium'
                            to="/contact"
                            onMouseEnter={() => handleHover('icon3', 'mouseenter')}
                            onMouseLeave={() => handleHover('icon3', 'mouseleave')}
                        >
                            Calculate
                        </NavLink>
                    </div>
                </div>

            </div>
            <div className="fixed top-0 left-0 z-[-2] w-full h-full rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
                {/* Your content goes here */}


            </div>
        </>
    )
}

export default Features
