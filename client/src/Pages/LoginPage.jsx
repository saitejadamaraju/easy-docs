import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginPage = () =>{

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const {login,loading}=useLogin();


    const handleSubmit= async (e)=>{

        e.preventDefault();
        await login(username,password);

    }


    return (

        <div className=" flex flex-row justify-center items-center m-2 p-2">
            <div className="bg-gray-300 py-4 px-4 w-[400px] rounded-md hover:shadow-2xl">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col m-1 p-2">
                   <label className=" font-semibold mb-1">username</label>
                   < input 
                     type="text"
                     className="py-2 px-5 rounded-md"
                     placeholder="Enter full name"
                     value={username}
					onChange={(e) => setUsername(e.target.value) }></input>
                </div>
                <div className="flex flex-col m-1 p-2">
                   <label className=" font-semibold mb-1">password</label>
                   <input 
                     type="password"
                     className="py-2 px-5 rounded-md"
                     placeholder="Enter user name"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="flex flex-col m-1 p-2">
                  <button type="submit" className="bg-violet-500 p-2 rounded-lg cursor-pointer font-semibold">{loading ? <span className='loading loading-spinner'></span> : "Sign In"}</button>
                </div>
                <div className="flex flex-col m-1 p-2 font-semibold">
                  <p>{"Don't"} have an account ? <span className="text-violet-800 underline"><Link to={"/signup"}> signup</Link></span></p>
                </div>
                
            </form>
            </div>            
        </div>
    )


}

export default LoginPage;