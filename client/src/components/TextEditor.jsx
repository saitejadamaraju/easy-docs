import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import { useCallback,useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import { useParams } from 'react-router-dom';
import useAppstore from '../zustand/useAppstore';
import TextEditorHeader from './TextEditorHeader';
import ShareCard from './ShareCard';

const SAVE_INTERVAL_MS=2000;
const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ]

// eslint-disable-next-line react/prop-types
const TextEditor =()=>
{
  const {id:documentId} = useParams();
  const[socket,setSocket]=useState();
  const[quill,setQuill]=useState();
  const {authUser,isShareSelected} = useAppstore();
  const {setCurrentDocId} = useAppstore();

  useEffect(()=>{

    if(socket == null || quill == null) return;

    socket.once("load-document", document => {
       
      quill.setContents(document);
      quill.enable();
    })
    
    setCurrentDocId(documentId);
    socket.emit("get-document",authUser?._id,documentId);

  },[socket,quill,documentId,authUser])

  useEffect(()=>{

    if(socket==null ||  quill==null) return;

     const handler = (delta)=>{
        console.log("delta is ",delta);
        quill.updateContents(delta);
     }

     socket.on("receive-changes",handler);

     return ()=>{
        socket.off("receive-changes",handler);
     }


  },[socket,quill])

  useEffect(()=>{

     if(socket==null ||  quill==null) return;

     const handler = (delta,oldDelta,source)=>{

      if(source!="user") return;
      socket.emit("send-changes",delta);
     }

     quill.on("text-change",handler);

     return ()=>{
        quill.off("text-change",handler);
     }


  },[socket,quill])

  useEffect(()=>{
    if(socket == null || quill == null) return;

    const interval = setInterval(()=>{
        socket.emit("save-document",quill.getContents())
    },SAVE_INTERVAL_MS)

    return ()=> clearInterval(interval);

  },[socket,quill])

  useEffect(()=>{
   
    const s = io("https://easy-docs.onrender.com");
    // const s = io("http://localhost:5000");
    setSocket(s);

    return ()=>{

      s.disconnect();
    }


  },[])


   const wrapperRef = useCallback((wrapper)=>{
    if(wrapper === null ) return;
    wrapper.innerHTML='';
    const editor = document.createElement('div');
    wrapper.append(editor);    
    const q = new Quill(editor, { theme: 'snow' ,  modules: { toolbar: TOOLBAR_OPTIONS }});
    q.enable(false);
    q.setText("Loading..");
    setQuill(q);

    },[])
   
  
    return (

     <div className=''>
       <TextEditorHeader/>
       {isShareSelected && <div className='flex items-center justify-center relative'><ShareCard/></div>}
       <div id="container" className="m-2" ref={wrapperRef}></div>
     </div>

    
      
    )

}

export default TextEditor;