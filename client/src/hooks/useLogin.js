import { useState } from "react";
import useAppstore from "../zustand/useAppstore";
import toast from "react-hot-toast";


const useLogin = ()=>{
    
    const [loading,setLoading]=useState(false);
    const {setAuthUser}=useAppstore();
    

    const login = async (username,password) =>
    {
        //login logic goes here
        setLoading(true);
        try 
        {
            const res = await fetch("/api/auth/login",{
                method:'POST',
                headers :{"Content-Type":"application/json"},
                body:JSON.stringify({username,password})
            })

            const data = await res.json();

            if(data.error)
            {
                throw new Error(data.error)
            }
            localStorage.setItem("doc-user", JSON.stringify(data));
            setAuthUser(data);
        } 
        catch (error) 
        {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }

    }

    return {loading,login};

}

export default useLogin;