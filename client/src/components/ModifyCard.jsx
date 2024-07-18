import { useRef, useState } from "react";
import useAppstore from "../zustand/useAppstore"
import { RxCross1 } from "react-icons/rx";
import useModifyDocuments from "../hooks/useModifyDocument";
import toast from "react-hot-toast";

const ModifyCard = ({setReload}) => {

    const {setIsModifySelected,selectedDocument} = useAppstore();
    const {renameDocument,deleteDocument} = useModifyDocuments();
    const [isRename,setIsRename] = useState(false);
    const [isDelete,setIsDelete] =  useState(false);
    //const [isDownload,setIsDownload] = useState(false);

    const nameRef= useRef();
    const deleteNameRef=useRef();

    const rename = async () =>
    {
        await renameDocument(selectedDocument?._id,nameRef.current.value);
        setIsRename(false);
        setIsModifySelected(false);
        setReload('renamed');
        
    }

    const deleteDoc = async () =>
    {
       const docName=selectedDocument?.name;
       if(docName === deleteNameRef.current.value)
       {
          await deleteDocument(selectedDocument?._id);
       }
       else
       {
         toast.error("document name entered is incorrect");
       }

       setIsDelete(false);
       setIsModifySelected(false);
       setReload('deleted');
       
    }

    

    return(

        <div className='w-[300px] sm:w-[350px] h-[300px] md:w-[450px] bg-white border border-solid hover:border-gray-600 rounded-lg absolute z-10 top-[50%] shadow-lg'>
            <div className='flex flex-col mx-2 my-1'>
            
              {/* cross icon */}
              <div onClick={()=>setIsModifySelected(false)} className='flex justify-end p-2 cursor-pointer mb-2'>
                 <RxCross1 />
              </div>

              {/* Rename */}
              <div className="flex flex-col m-1">
                
                <div className="font-bold">
                  <h4 onClick={()=>setIsRename(!isRename)}className="m-1 cursor-pointer">Rename</h4>
                </div>
                
                {isRename && (
                <div className="flex m-1">
                    <div className="w-9/12 m-1">
                        <input
                            ref={nameRef}
                            className="w-full"
                            placeholder="Enter new name here"></input>
                    </div>
                    <div className="w-3/12 m-1">
                        <button onClick={()=>rename()} className="w-full bg-violet-500 rounded-lg">save</button>
                    </div>    
                </div> )}
                           
             </div>

             {/* delete */}
             <div className="flex flex-col m-1">
                
                <div className="font-bold">
                  <h4 onClick={()=>setIsDelete(!isDelete)}className="m-1 cursor-pointer">Delete</h4>
                </div>
                
                {isDelete && (
                <div className="flex flex-col m-1">
                    <div>
                      <h3 className="text-red-600 font-semibold">Are you sure you want to delete it?</h3>
                    </div>
                    <div className='flex'>
                    <div className="w-9/12 m-1">
                        <input
                            ref={deleteNameRef}
                            className="w-full p-1"
                            placeholder={`Type ${selectedDocument?.name} here`}></input>
                    </div>
                    <div className="w-3/12 m-1">
                        <button onClick={()=>deleteDoc()} className="w-full bg-violet-500 rounded-lg p-1">delete</button>
                    </div> 
                    </div>
                      
                </div> )}
                           
             </div>

              {/* download
              <div className='flex flex-col m-1'>

                <div className="font-bold">
                  <h4 onClick={()=>setIsDownload(!isDownload)}className="m-1 cursor-pointer">Download</h4>
                </div>

                {isDownload && 
                (
                  <div className="flex m-1">
                  
                      <div className="w-9/12 m-1">
                          <h3>{selectedDocument?.name}</h3>
                      </div>

                      <div className="w-3/12 m-1">
                        <button onClick={()=>download()}className="flex justify-center w-full bg-violet-500 rounded-lg p-1">
                          <IoMdDownload />
                        </button>
                      </div> 

                </div>
              )}

              </div> */}

             </div>
        </div>
    )
}

export default ModifyCard