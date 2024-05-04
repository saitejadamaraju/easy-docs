import { useState} from "react";
import toast from "react-hot-toast";
import useAppstore from "../zustand/useAppstore";

const useProvideAccess = ()=>
{
    const [loading,setLoading]=useState(false);
    const [message,setMessage]=useState();
    const {currentDocId:docId} = useAppstore();
    
        const provideAccess = async(user)=>{

            setLoading(true);
            const username = user?.username;
            try 
            {   
                const res = await fetch('/api/user/access',{
                    method :'PUT',
                    headers :{"Content-Type": "application/json"},
                    body:JSON.stringify({username,docId})
                })

                const data = await res.json();
                
                if(data.error)
                {
                    throw new Error(data.error);
                }
                setMessage(data.message);
                toast.success(data.message);           
            } catch (error) {
                toast.error(error.message);
            }
            finally
            {
                setLoading(false);
            }

            return message;
        }
     return {loading,provideAccess};
}

export default useProvideAccess;