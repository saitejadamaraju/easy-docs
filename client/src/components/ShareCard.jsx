import { useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import useGetUserDetails from "../hooks/useGetUserDetails";
import useProvideAccess from "../hooks/useProvideAccess";
import useAppstore from "../zustand/useAppstore";

const ShareCard = () =>
{
   const searchref= useRef();
   const {getUser,user} = useGetUserDetails();
   const {provideAccess} = useProvideAccess();
   const {setIsShareSelected,authUser} = useAppstore();
   const [statusMessage,setStatusMessage]=useState();
  //  const [selectedUser,setSelectedUser] = useState();

   const searchUser = async () =>
   {
       console.log("search string is",searchref.current.value);
       await getUser(searchref.current?.value);
   }

  //  const selectUser = () =>
  //  {
  //     setSelectedUser(user);
  //     console.log("selected user is ",selectedUser);

  //  }

   const provideaccess = async () =>
   {
      const message = await provideAccess(user);
      setStatusMessage(message);
      setIsShareSelected(false);
   }
    
    return(

        <div className='w-[300px] sm:w-[350px] h-[300px] md:w-[450px] bg-white border border-solid hover:border-gray-600 rounded-lg absolute z-10 top-[50%] shadow-lg'>
            <div className='flex flex-col mx-2 my-1'>
            
              {/* cross icon */}
              <div onClick={()=>setIsShareSelected(false)} className='flex justify-end p-2 cursor-pointer mb-2'>
                 <RxCross1 />
              </div>

              {/*search input and button*/}
              <div className='flex p-2 mb-2'>
                <div className='w-8/12 '>
                    <input 
                      className='w-full rounded-md border border-black p-1'
                      placeholder='search here'
                      ref={searchref}></input>
                </div>
                <div className='w-4/12 ml-1 rounded-md bg-violet-500 hover:border border-black'>
                    <button onClick={()=>searchUser()} className='w-full p-1'>search</button>
                </div>    
              </div>

              {/* search result */}
              {user ? (
                  <div className='flex p-2  mb-2 rounded-lg hover:border border-gray-500'>
                  <div className='w-8/12'>
                    <p className='font-bold'>search details</p>
                    <p className='text-md font-semibold'>{user?.username}</p>
                    <p className='text-sm'>{user?.fullName}</p>
                  </div>
                  {/* <div className='w-4/12 flex flex-col justify-center items-center ml-1'>
                    <button onClick={()=>selectUser()} className="w-full rounded-md bg-violet-500 p-1 hover:border border-black font-semibold">select</button>
                  </div>          */}
                </div>
              ):(
                 <p className='p-1 m-1 font-semibold text-red-600'>No result found</p>
              )}
              

              {/* owners details */}
              <div className='flex p-2 mb-2 rounded-lg hover:border border-gray-500 '>
                <div className='w-8/12'>
                  <h4 className='font-bold'>Owner details</h4>
                  <p className='text-sm font-semibold'>{authUser?.username}</p>
                  <p className='text-sm'>owner</p>
                </div>
              </div>

              <div className='flex p-2 justify-center items-center'>
                <button onClick={()=>provideaccess()}className="bg-violet-500 p-1 rounded-lg hover:border border-black font-semibold">provide access</button>
              </div>
              
            </div>
        </div>
    )

}

export default ShareCard;