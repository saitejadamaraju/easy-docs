import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useDocuments = () =>{

    const [loading,setLoading]=useState(false);
    const [documents,setDocuments]=useState([]);

    useEffect(()=>{

        const getDocuments = async()=>{

            setLoading(true);
            try {
    
                const res = await fetch("/api/user/documents");
                const data= await res.json();

                if(data.error)
                {
                    throw new Error(data.error);
                }
                setDocuments(data.message);   
                //console.log("documents data is ",data);           
            } catch (error) {
                toast.error(error.message);
            }
            finally
            {
                setLoading(false);
            }
        }

        getDocuments();

    },[])

     return {loading,documents};

}

export default useDocuments;