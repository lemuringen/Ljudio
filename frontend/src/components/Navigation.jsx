import React, { useState } from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons/lib';

function Navigation() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <header>
            <div className="nav-holder">
                <div>
                    <Link to="/">
                        <img className="logo" src="../src/img/logga_ljudio.png" alt="Ljudio logo" />
                    </Link>
                </div>
                <div className="navbar">
                    <IconContext.Provider value={{ color: '#fff' }} />
                    <Link to="#" className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                    <li key="logout" className="nav-text-logout" id="logout" onClick={() => {
                        fetch('/logout')
                    }}>
                        <Link to={"/Login"}>
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navigation