import React from 'react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {



    const handleHover = (iconId, eventType) => {
        const icon = document.getElementById(iconId);
        if (icon) {
            icon.dispatchEvent(new Event(eventType));
        }
    };
    return (
        <nav className='bg-green-500 text-balck sticky top-0 w-100% z-20 '>
            <div className="mycontainer flex justify-between items-center py-5 px-4 h-auto flex-wrap  ">

                <div className="logo font-bold text-2xl text-center flex justify-center items-center">
                    <span className="text-green-200">&lt;E</span>
                    <span>
                        -COAL
                    </span>
                    <span className="text-green-900 text-3xl">/&gt;</span>
                </div>

                <ul>
                    <li className='flex gap-5 justify-center items-center font-bold'>
                        <lord-icon
                            id="icon1"
                            src="https://cdn.lordicon.com/cnpvyndp.json"
                            trigger="hover">
                        </lord-icon>
                        <NavLink to="/home"
                            className="ml-2 hover:font-extrabold"
                            onMouseEnter={() => handleHover('icon1', 'mouseenter')}
                            onMouseLeave={() => handleHover('icon1', 'mouseleave')}>
                            Home
                        </NavLink>
                        <lord-icon
                            id="icon10"
                            src="https://cdn.lordicon.com/uwinmnkh.json"
                            trigger="hover">
                        </lord-icon>
                        <NavLink to="/dashboard"
                            className="ml-2 hover:font-extrabold"
                            onMouseEnter={() => handleHover('icon10', 'mouseenter')}
                            onMouseLeave={() => handleHover('icon10', 'mouseleave')}>
                            Dashboard
                        </NavLink>

                        <lord-icon
                            id="icon2"
                            src="https://cdn.lordicon.com/yxczfiyc.json"
                            trigger="hover">
                        </lord-icon>
                        <NavLink to="/about"
                            className="ml-2 hover:font-extrabold"
                            onMouseEnter={() => handleHover('icon2', 'mouseenter')}
                            onMouseLeave={() => handleHover('icon2', 'mouseleave')}>
                            About
                        </NavLink>

                        <lord-icon
                            id="icon3"
                            src="https://cdn.lordicon.com/rsvfayfn.json"
                            trigger="hover">
                        </lord-icon>
                        <NavLink
                            to="/contact"
                            className="ml-2 hover:font-extrabold"
                            onMouseEnter={() => handleHover('icon3', 'mouseenter')}
                            onMouseLeave={() => handleHover('icon3', 'mouseleave')}
                        >
                            Contact
                        </NavLink>
                    </li>
                </ul>
                <div className="flex
                justify-center gap-4 items-center font-bold">
                    <lord-icon
                        // style = {{width: '40px', height: '40px', color: 'white'}}
                        id="icon4"
                        src="https://cdn.lordicon.com/kkvxgpti.json"
                        trigger="hover">
                    </lord-icon>
                    <NavLink
                        to="/features"
                        className="ml-2 hover:font-extrabold"
                        onMouseEnter={() => handleHover('icon3', 'mouseenter')}
                        onMouseLeave={() => handleHover('icon3', 'mouseleave')}
                    >
                        Features
                    </NavLink>
                    <lord-icon
                    id="icon5"
                        src="https://cdn.lordicon.com/hrjifpbq.json"
                        trigger="hover"
                        >
                    </lord-icon>

                    <NavLink
                        to="/login"
                        className=" bg-white text-green-900 px-5 py-1 m-1 ml-2 rounded-lg hover:font-extrabold"
                        onMouseEnter={() => handleHover('icon5', 'mouseenter')}
                        onMouseLeave={() => handleHover('icon5', 'mouseleave')}
                    >
                         Login
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
