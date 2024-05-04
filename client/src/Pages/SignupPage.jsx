import { useState } from "react";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignup";

const SignupPage = () =>
{
   const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

   const {signup,loading} = useSignUp();

   const handleSubmit= async (e)=>{

      e.preventDefault();
      console.log(inputs);
      await signup(inputs);
  }


    return (
        <div className=" flex flex-row justify-center items-center m-2 p-2">
            <div className="bg-gray-300 py-4 px-4 w-[400px] rounded-md hover:shadow-2xl">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col m-1 p-2">
                   <label className=" font-semibold mb-1">fullName</label>
                   < input 
                     type="text"
                     className="py-2 px-5 rounded-md"
                     placeholder="Enter full name"
                     value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}></input>
                </div>
                <div className="flex flex-col m-1 p-2">
                   <label className=" font-semibold mb-1">username</label>
                   <input 
                     type="text"
                     className="py-2 px-5 rounded-md"
                     placeholder="Enter user name"
                     value={inputs.username}
                     onChange={(e) => setInputs({ ...inputs, username: e.target.value })}></input>
                </div>
                <div className="flex flex-col m-1 p-2">
                   <label className=" font-semibold mb-1">password</label>
                   <input 
                     type="password" 
                     className="py-2 px-5 rounded-md"
                     placeholder="Enter password"
                     value={inputs.password}
                     onChange={(e) => setInputs({ ...inputs, password: e.target.value })}></input>
                </div>
                <div className="flex flex-col m-1 p-2">
                   <label className=" font-semibold mb-1">confirm password</label>
                   <input 
                     type="password" 
                     className="py-2 px-5 rounded-md"
                     placeholder="Re-enter password"
                     value={inputs.confirmPassword}
                     onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}></input>
                </div>
                <div className="flex flex-col m-1 p-2">
                   <label className=" font-semibold mb-1">gender</label>
                   <select value={inputs.gender} onChange={(e)=> setInputs({...inputs,gender : e.target.value})} className="py-2 px-5 rounded-md">
                            <option >-------select-------</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                   </select>
                </div>
                <div className="flex flex-col m-1 p-2">
                  <button type="submit" className="bg-violet-500 p-2 rounded-lg cursor-pointer font-semibold " disabled={loading}>{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}</button>
                </div>
                <div className="flex flex-col m-1 p-2 font-semibold">
                  <p>Already have an account ? <span className="text-violet-800 underline"><Link to={"/signin"}> signin</Link></span></p>
                </div>
                
            </form>
            </div>            
        </div>
        
    )

}

export default SignupPage;

