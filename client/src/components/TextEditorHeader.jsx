import { useState } from "react";
import useAppstore from "../zustand/useAppstore";
import html2pdf from 'html2pdf.js';


const TextEditorHeader = () =>
{
    const {setIsShareSelected,selectedDocument}=useAppstore();


    const share=()=>
    {
        setIsShareSelected(true);
    }

    const download = ()=>
    {
        console.log("inside downlaod");
        // const htmlContent = currentQuill.root.innerHTML;
        const htmlElement = document.querySelector('.ql-editor');
        const options = {

            filename: `${selectedDocument?.name}.pdf`,

            margin: 0.5,

            image: { type: 'jpeg', quality: 0.98 },

            html2canvas: { scale: 2 },

            jsPDF: {

                unit: 'in',

                format: 'letter',

                orientation: 'portrait'

            }

        };
        html2pdf().set(options).from(htmlElement).save();
    }

    return (

        <div className="bg-gray-300 h-[50px] flex">
            <div className="w-6/12 flex flex-row items-center p-4 m-2">
                <h3 className='font-bold hover:text-blue-600 cursor-pointer'>{selectedDocument?.name}</h3>
            </div>
            <div className="w-6/12  flex flex-row justify-end items-center p-4 m-2">
              <button onClick={()=>download()} className=" m-2 py-2 px-4 font-semibold rounded-full hover:text-blue-600">Download</button>
              <button onClick={()=>share()} className=" m-2 py-2 px-4 font-semibold rounded-full hover:text-blue-600">Share</button>
            </div>           
        </div>
    )
}

export default TextEditorHeader;