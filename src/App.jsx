import './App.css'
import Dashboard from './components/Dashboard'
import Gov_navbar from './components/Gov_navbar'
import Navbar from './components/Navbar'
// import Gov_navbar from './components/Gov_navbar'
// import Link from 'next/link'

function App() {

  return (
    <>
    <div className="absolute top-0 z-[-2]  min-h-full min-w-full rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
    </div>
    <Gov_navbar />
    <Navbar />
    <Dashboard />
      <div className='bg-slate-300'>
        {/* Hello */}
      </div>
    </>
  )
}

export default App
App.js

