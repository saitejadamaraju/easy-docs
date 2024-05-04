import User from "../models/User.js"

export const fetchUserDetails = async (req,res)=>{

    try {
        
        const searchString = req.query?.search;
        console.log("searchString is ",searchString);
        const user = await User.findOne({username:searchString})
        console.log("search result is ",user);
        if(user)
        {
            res.status(200).json({
                message:user,
            })
        }
        else{
            res.status(400).json({
                error:"No result found"
            })
        }
        
    } catch (error) {

        console.log("Error in fetchUserDetails controller ",error.message);
        res.status(500).json({error:"Internal server error"});       
    }


}

export const provideAccessToDocument = async (req,res) =>
{
    const {username,docId}=req.body;
    try {
        
        if(username == null || docId == null) return;
        const user = await User.findOne({username:username})
        user.documents.push(docId);
        await user.save();

        const updatedUser = await User.findOne({username:username})
        const isLinked = updatedUser.documents.indexOf(docId);
        if(isLinked !==-1)
        {
             res.status(200).json({
                message:"document access provided to "+username
             })
        }
        else
        {
            res.status(400).json({
                error:"error providing document access to user"+username
            })
            
        }
        
        
    } catch (error) 
    {
        console.log("Error in provideAccessToDocument controller ",error.message);
        const message=error.message;
        console.log(message);
        if(message.includes('Duplicate documents are not allowed'))
        {
            res.status(500).json({error:"User Already has access to this document"});  
        }
        else
        {
            res.status(500).json({error:"Internal server error"});  
        }
          
    }
}
