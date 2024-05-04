import { useState } from "react";
import toast from "react-hot-toast";

const useModifyDocuments = () =>{

    const [loading,setLoading]=useState(false);

    

        const renameDocument = async (docId,updatedName)=>{

            setLoading(true);
            try {
    
                const res = await fetch('/api/user/rename',{
                    method :'PUT',
                    headers :{"Content-Type": "application/json"},
                    body:JSON.stringify({docId,updatedName})
                })
                const data= await res.json();

                if(data.error)
                {
                    throw new Error(data.error);
                }  
                
                toast.success(data.message);

            } catch (error) {
                toast.error(error.message);
            }
            finally
            {
                setLoading(false);
            }
        }

        const deleteDocument = async (docId) =>
        {
            setLoading(true);
            try {
    
                const res = await fetch('/api/user/delete',{
                    method :'DELETE',
                    headers :{"Content-Type": "application/json"},
                    body:JSON.stringify({docId})
                })
                const data= await res.json();

                if(data.error)
                {
                    throw new Error(data.error);
                }  
                
                toast.success(data.message);

            } catch (error) {
                toast.error(error.message);
            }
            finally
            {
                setLoading(false);
            }
        }

        const downloadDocument = async (docId) => {

            setLoading(true);
            try {
    
                const res = await fetch('/api/user/document',{
                    method :'POST',
                    headers :{"Content-Type": "application/json"},
                    body:JSON.stringify({docId})
                })
                const data= await res.blob();
                 console.log("blob data is ",data);

                if(data.error)
                {
                    throw new Error(data.error);
                }  
                
                toast.success(data.message);
                return data;

            } catch (error) {
                toast.error(error.message);
            }
            finally
            {
                setLoading(false);
            }
        }


     return {loading,deleteDocument,renameDocument,downloadDocument};

}

export default useModifyDocuments;