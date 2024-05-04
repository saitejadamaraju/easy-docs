import { useState } from "react";
import toast from "react-hot-toast"; 
import useAppstore from "../zustand/useAppstore";

const useSignUp = () =>
{
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAppstore();

    const signup= async ({fullName,username,password,confirmPassword,gender}) =>
    {

        //logic to signup
        const success=validateInputs(fullName,username,password,confirmPassword,gender)
        if(!success) return;
        setLoading(true);
        try {

            const res = await fetch('/api/auth/signup',{
                method :'POST',
                headers :{"Content-Type": "application/json"},
                body:JSON.stringify({fullName,username,password,confirmPassword,gender})
            })

            const data = await res.json();
            if(data.error)
            {
                throw new Error(data.error);
            }
            localStorage.setItem("doc-user", JSON.stringify(data)); 
            setAuthUser(data);

            
        } 
        catch (error) 
        {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

     return {signup,loading};
}

export default useSignUp;


const validateInputs=(fullName,username,password,confirmPassword,gender)=>
{

    if(!fullName || !username || !password || !confirmPassword || !gender)
    {
        toast.error("please fill all the details");
        return false;
    }

    if(password!==confirmPassword)
    {
        toast.error("password mismatch");
        return false;
    }

    if(password.length < 6)
    {
        toast.error("password length should be more than 6 characters");
        return false;
    }

    return true;
    

}