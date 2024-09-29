import React from 'react'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'

const Features = () => {
    useEffect(() => {
        document.title = "Features";
      }, []);
    return (
        <>
            <div className="flex justify-center items-center flex-col">

                <div className='text-green-700 text-3xl py-10'>F E A T U R E S</div>
                <div className="text-5xl font-bold text-green-500">Our Features & Services.</div>
                <div className="container flex gap-10 justify-center py-10 max-lg:flex-col">
                    <div className="w-auto h-auto bg-white rounded-2xl flex flex-col  items-center text-center gap-4">
                        <img className='w-60 top-0 h-80' src="https://media.istockphoto.com/id/1225779146/vector/coal-mine-engineers-controlling-heavy-hydraulic-machines.jpg?s=612x612&w=0&k=20&c=8vkdCUQLG4Xvzo9pdjmpimTgsmp0ETNxADRh8NQIN2U=" alt="" />
                        <h1 className='font-bold text-green-600 text-2xl'>Safety & fire risk assessment</h1>
                        <p className='font-sans text-xl'>The API monitors coal mine safety by tracking carbon monoxide, methane, and dust levels, evaluating risks, issuing evacuation alerts, and detecting health issues like Black lung disease and silicosis from high dust levels.</p>
                        <NavLink
                        className='bg-green-700 text-white text-xl p-2 px-7 relative bottom-2 rounded-full hover:font-medium'
                            to="/carboncalculator"
                            
                        >
                            More
                        </NavLink>
                    </div>
                    <div className="w-auto h-auto bg-white rounded-2xl flex flex-col  items-center text-center gap-4">
                        <img className='w-70 top-0 h-80' src="https://cdn.prod.website-files.com/649a7bd9d30be4bdd61239e5/6638b37097b43289defc5dd0_calculator-thumbnail.webp" alt="" />
                        <h1 className='font-bold text-green-600 text-2xl'>Carbon Calculator</h1>
                        <p className='font-sans text-xl'>The XGBoost model predicts CO₂ and methane emissions from coal and energy data, while a Flask API delivers real-time carbon footprints, tree offsets, and sustainable solutions for global warming mitigation.</p>
                        <NavLink
                        className='bg-green-700 text-white text-xl p-2 px-7 relative bottom-2 rounded-full  hover:font-medium'
                            to="/carbonemission"
                            >
                            Calculate
                        </NavLink>
                    </div>
                    <div className="w-auto h-auto bg-white rounded-2xl flex flex-col  items-center text-center gap-4">
                        <img className='w-60 top-0 h-80' src="https://img.freepik.com/premium-vector/graph-with-decrease-report-diagram-with-recession-bankruptcy-progresstration_186380-1854.jpg?semt=ais_hybrid" alt="" />
                        <h1 className='font-bold text-green-600 text-2xl'>More Features & Services</h1>
                        <p className='font-sans text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos dicta laborum labore ad autem ullam asperiores tenetur dolorum numquam veritatis?</p>
                        <NavLink
                        className='bg-green-700 text-white text-xl p-2 px-7 relative bottom-2 rounded-full hover:font-medium'
                            to="/moreFeatures">
                            More
                        </NavLink>
                    </div>
                </div>

            </div>
            <div className="fixed top-0 left-0 z-[-2] w-full h-full rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
            </div>
        </>
    )
}

export default Features
