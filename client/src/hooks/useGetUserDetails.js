import { useState} from "react";
import toast from "react-hot-toast";

const useGetUserDetails = ()=>
{
    const [loading,setLoading]=useState(false);
    const [user,setUser]=useState();

   

        const getUser = async(searchString)=>{

            setLoading(true);
            try {
    
                const res = await fetch(`/api/user/details?search=${searchString}`);
                const data= await res.json();

                if(data.error)
                {
                    throw new Error(data.error);
                }
                setUser(data.message);   
                console.log("user data is ",data);           
            } catch (error) {
                toast.error(error.message);
                setUser('');
            }
            finally
            {
                setLoading(false);
            }
        }
     return {loading,getUser,user};
}

export default useGetUserDetails;