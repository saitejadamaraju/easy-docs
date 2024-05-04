import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAppstore from "../zustand/useAppstore";

const useDocuments = () =>{

    const [loading,setLoading]=useState(false);
    const {setdocuments}=useAppstore();

    

        const getDocuments = async()=>{

            setLoading(true);
            try {
    
                const res = await fetch("/api/user/documents");
                const data= await res.json();

                if(data.error)
                {
                    throw new Error(data.error);
                }
                setdocuments(data.message);   
                //console.log("documents data is ",data);           
            } catch (error) {
                toast.error(error.message);
            }
            finally
            {
                setLoading(false);
            }
        }
    
        return {getDocuments}
}

export default useDocuments;