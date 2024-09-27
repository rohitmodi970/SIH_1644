import React from 'react'
import DynamicCard from './DynamicCard'
import PieChart from './PieChart'
import Graph from './Graph'
import { Pie } from 'recharts'
const Dashboard = () => {
    return (
        <div className='container  flex flex-wrap gap-4 w-fit'>
            <div className="flex  flex-row m-3 gap-3 w-fit justify-center items-center text-center">

            <DynamicCard />
            <DynamicCard />
                
                <div className="bg-slate-100 h-[40vh] w-[40vw] rounded-2xl"><Graph /></div>


            </div>
            <div className="flex  flex-row m-3 gap-3 w-fit">
                <DynamicCard />
                
                <DynamicCard />

                <div className="bg-slate-100 h-[40vh] w-[54vw] rounded-2xl">
                <PieChart />
                </div>




            </div>

            {/* <div className="flex flex-col justify-start left-0 top-[40vh] absolute gap-3 flex-wrap p-3 w-fit md:top-[56vh]">

                <div className="bg-[grey] h-[30vh] w-[23vw] rounded-2xl"></div>

            </div>
            <div className="flex flex-col right-1 top-[67vh] absolute m-3 w-fit md:top-[86vh]">

                
            <div className="bg-[yellow] h-[40vh] w-[28vw] rounded-2xl"></div>

            </div> */
            }
            {/* <div className="bg-[yellow] h-[40vh] w-[25vw] rounded-2xl"></div> */}
                {/* <div className="bg-slate-300 h-[30vh] w-[22vw] rounded-2xl"></div> */}
                {/* <div className="bg-[yellow] h-[40vh] w-[25vw] rounded-2xl top-[-25px]"></div> */}
                {/* <div className="bg-slate-100 h-[40vh] w-[25vw] rounded-2xl top-[-25px]">
                
                </div> */}


<div className="absolute z-[-2]  min-h-full min-w-full rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
    </div>
        </div>
    )
}

export default Dashboard

