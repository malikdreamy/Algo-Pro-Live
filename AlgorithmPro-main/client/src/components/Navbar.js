import React, { useState } from "react";
import { Link } from "react-router-dom"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import Auth from "../utils/auth"

const Navbar = () => {

    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav)
    }
    const  handleLogout = (mobile) => {
        Auth.logout();
      };
    return (
        <div className=" relative top-0">
            <nav style={{position: 'relative', zIndex: '9'}} className="flex  justify-between items-center h-24 max-w-[100%] mx-auto px-4 text-white  nav--bar">
                <h1 className="w-full text-3xl font-bold primary--text--color"> ALGO PRO</h1>
                <ul className="hidden md:flex">
                    <Link to={'/'} className="p-4 nav--links">HOME</Link>

    
                    <Link className="p-4" to="/chat">CHALLENGE</Link>
                    {Auth.loggedIn() ? (
                        <>  <Link to={`/Profile`} className="p-4 ">PROFILE</Link> 
                        <Link onClick={() => { handleLogout('mobile') }} className="p-4">LOGOUT</Link>
                          <Link className="p-4" to='/files'>FILES</Link></>

                         ) : (
                        <>
                        <Link to={'/login'} className="p-4 ">LOGIN</Link>
                        </> )}
                    
                </ul>
                <div onClick={handleNav} className="block md:hidden" >
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}

                </div>
                <nav  className={nav ? " z-[9999] fixed left-0 top-0 w-[60%] h-full nav--bar ease-in-out duration-500" : "fixed  bg-purple-800 left-[-100%]"} >
                    <h1 className="w-full text-3xl font-bold primary--text--color m-4"> ALGO PRO</h1>
                    <ul style={{zIndex: "70"}} className="p-4 flex flex-col relative">

                        <Link onClick={() => { setNav(false) }} to={'/'} className="p-4 border-b border-gray-500 w-[100%]">HOME</Link>
                        {Auth.loggedIn() ? (<>
                            <Link className="p-4  border-b border-gray-500 w-[100%]" to="/chat">CHALLENGE</Link>
                            <Link className="p-4  border-b border-gray-500 w-[100%]" to='/files'>FILES</Link>
                                <Link to="/Profile" className="p-4 border-b border-gray-500">PROFILE</Link>
                            </>):(<>
                                <Link onClick={() => { setNav(false) }} to={'/login'} className="p-4 border-b border-gray-500">LOGIN</Link>
                            </>)}
                        
            
                    </ul>
                </nav>
            </nav>
        </div>
    )
}

export default Navbar