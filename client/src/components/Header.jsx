import { Link } from "react-router-dom";
import useAppstore from "../zustand/useAppstore";
import useLogout from "../hooks/useLogout";
import { FaUserCircle } from "react-icons/fa";
import {  useEffect, useState } from "react";



const Header = () =>{
    
    const {authUser} = useAppstore();
    const {logout} = useLogout();
    const [userClicked,setUserClicked] = useState(false);

    

    const logOut = async () =>
    {
         await logout();
    }

    

    return (
       
       
        <div className="bg-violet-500 h-[50px] flex">
            <div className="w-3/12 flex flex-row items-center p-4 m-2">
               <span className="text-xl cursor-pointer font-bold"><Link to={"/home"}>easydocs</Link></span>
            </div>
            <div className="w-9/12">
               <ul className="font-semibold flex flex-row justify-end items-center p-4">
                    {/* <li className="cursor-pointer "><Link to={"/home"}>Home</Link></li> */}
    
                    {authUser && (
                        
                         <li  onClick={()=>setUserClicked(!userClicked)} className="cursor-pointer relative">
                            <FaUserCircle size={30} />
                            {userClicked && (
                                    <div  className='absolute bg-white py-2 px-4 mt-2 right-0 rounded-lg'>
                                        <ul className=''>
                                            <li onClick={logOut} className='cursor-pointer hover:text-blue-600'>Logout</li>
                                        </ul>
                                    </div>
                                )}
                            
                        </li>
                         
                         
                       )
                    }

               </ul>
               
            </div>            
        </div>
        
       
    )


}

export default Header;