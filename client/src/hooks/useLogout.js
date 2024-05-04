import { useState } from "react";
import toast from "react-hot-toast"; 
import useAppstore from "../zustand/useAppstore";


const useLogout = () =>
{
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAppstore();

    const logout= async () =>
    {

        //logic to logout
        setLoading(true);
        try {

            const res = await fetch('/api/auth/logout',{
                method :'POST',
                headers :{"Content-Type": "application/json"},
            })

            const data = await res.json();
            if(data.error)
            {
                throw new Error(data.error);
            }
            localStorage.removeItem("doc-user");
            setAuthUser(null);
            toast.success(data.message);

            
        } 
        catch (error) 
        {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

     return {logout,loading};
}

export default useLogout;

