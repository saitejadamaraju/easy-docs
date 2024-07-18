import { v4 as uuidV4 } from "uuid"
import SignupPage from "./Pages/SignupPage";
import Header from "./components/Header"
import DocumentsPage from "./components/DocumentsPage"
import LoginPage from "./Pages/LoginPage";
import { Navigate, Route,Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useAppstore from "./zustand/useAppstore";
import TextEditor from "./components/TextEditor";
import { useEffect, useState } from "react";


function App() {


  const {authUser} = useAppstore();
  const [isDesktop, setIsDesktop] = useState(true);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsDesktop(window.innerWidth > 1024); // Adjust the threshold according to your preference
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize(); // Call it initially to set the state
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // if (!isDesktop) {
  //   return (
  //     <div className="text-center bg-red-500 text-white p-2">
  //       Please open this application on a desktop for a better experience.We are working on mobile version.
  //     </div>
  //   );
  // }
  

  return (
    <>
    
      <Header/>
    
      
      <Routes>
        <Route path="/" element={<Navigate to={ authUser? "/home" : "/signin"} />} />
        <Route path="/home" element={authUser ? <DocumentsPage /> : <Navigate to={"/signin"} />  } />
       <Route path="/documents/:id" element={authUser ? <TextEditor /> : <Navigate to={"/signin"} /> } />
        <Route path="/signup" element={authUser ? <Navigate to={"/"}/> : <SignupPage />}/>
        <Route path="/signin" element={authUser ? <Navigate to={"/"}/> :<LoginPage/>}/>
      </Routes>
      <Toaster/>
    </>
    
      
      
      
  )
}

export default App
