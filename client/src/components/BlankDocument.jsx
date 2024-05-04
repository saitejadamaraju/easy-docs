import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid"

const BlankDocument = () =>
{
    const navigate = useNavigate();

    const createNewDocument = () =>
    {
        navigate(`/documents/${uuidV4()}`)
    }
    
    return (

        <div className="bg-gray-200 h-[150px] w-[100px] flex flex-row justify-center items-center">
           <span onClick={()=>createNewDocument()} className="cursor-pointer"><FaPlus /></span>
        </div>
    )

}

export default BlankDocument;