import { Link} from "react-router-dom";
import useDocuments from "../hooks/useDocuments";
import BlankDocument from "./BlankDocument";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import ModifyCard from "./ModifyCard";
import useAppstore from "../zustand/useAppstore";


const DocumentsPage= () => {

    
    const {getDocuments}=useDocuments();
    const {isModifySelected,setIsModifySelected,setSelectedDocument,documents} = useAppstore();
    const [reload,setReload]=useState('');

    useEffect(()=>
    {
        const fetchdocs = async()=>
        {
            await getDocuments();
        }
        
        fetchdocs();

    },[reload])
    
    const handleMenuClick = (event, doc) => 
    {
        event.preventDefault();
        setIsModifySelected(true);
        setSelectedDocument(doc);
        
    }

    const selectDocument = (event, doc) => 
    {
        event.preventDefault();
        setSelectedDocument(doc);
    }


    return (

        <div className="m-2">
            { isModifySelected && 
                (
                    <div className='flex items-center justify-center relative'>
                        <ModifyCard setReload={setReload}/>
                    </div>
                )
           }
           <div className="m-2 p-2">
                <h3 className="font-semibold">New Document</h3>
                <div className="m-1">        
                    <BlankDocument/>
                </div>
            </div>
            
           <div className=" m-2 p-2">
             <h3 className="font-semibold" >your documents</h3>
             <div className="m-1">
             <ul className="py-1">
                {documents && documents.map((doc)=> (

                    <div className='flex m-1' key={doc._id}>
                        <div className='w-8/12'>
                            <li onClick={(e) => selectDocument(e, doc)} className="cursor-pointer " ><Link to={`/documents/${doc._id}`}>{(doc?.name) ? (doc?.name) : (doc._id)}</Link></li>
                        </div>
                        
                        <div onClick={(e) => handleMenuClick(e, doc)} className=' w-4/12 m-1 cursor-pointer'>
                            <BsThreeDotsVertical />
                        </div>                       
                    </div>
                    
                ))}           
             </ul>
             </div>
           </div>
        </div>
    )

}

export default DocumentsPage;

