import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
    const handleHover = (iconId, eventType) => {
        const icon = document.getElementById(iconId);
        if (icon) {
            icon.dispatchEvent(new Event(eventType));
        }
    };
    return (
        <nav className='bg-green-400 text-balck sticky top-0'>
            <div className="mycontainer flex justify-between items-center py-5 px-4 h-14 ">

                <div className="logo font-bold text-2xl">
                    <span className="text-green-200">&lt;E</span>
                    <span>
                        -COAL
                    </span>
                    <span className="text-green-500">/&gt;</span>
                </div>

                <ul>
                    <li className='flex gap-5 justify-center items-center'>
                        <lord-icon
                            id="icon1"
                            src="https://cdn.lordicon.com/cnpvyndp.json"
                            trigger="hover">
                        </lord-icon>
                        <NavLink to="/"
                            className="ml-2 hover:font-bold"
                            onMouseEnter={() => handleHover('icon1', 'mouseenter')}
                            onMouseLeave={() => handleHover('icon1', 'mouseleave')}>
                            Home
                        </NavLink>

                        <lord-icon
                            id="icon2"
                            src="https://cdn.lordicon.com/yxczfiyc.json"
                            trigger="hover">
                        </lord-icon>
                        <NavLink to="/about"
                            className="ml-2 hover:font-bold"
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
                            className="ml-2 hover:font-bold"
                            onMouseEnter={() => handleHover('icon3', 'mouseenter')}
                            onMouseLeave={() => handleHover('icon3', 'mouseleave')}
                        >
                            Contact
                        </NavLink>
                    </li>
                </ul>
                <div className="flex
                justify-center ">
                    <lord-icon
                        // style = {{width: '40px', height: '40px', color: 'white'}}
                        id="icon4"
                        src="https://cdn.lordicon.com/kkvxgpti.json"
                        trigger="hover">
                    </lord-icon>
                    <input
                        onMouseEnter={() => handleHover('icon4', 'mouseenter')}
                        onMouseLeave={() => handleHover('icon4', 'mouseleave')}
                        className='rounded-full text-black text-center' type="text" placeholder='Search' />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
