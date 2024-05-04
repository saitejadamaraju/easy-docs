import User from "../models/User.js"
import Document from "../models/Document.js";

export const fetchDocuments = async (req,res)=>
{

    try {
        
        const userId = req.user._id
        console.log("user id is ",userId);
        const user = await User.findOne(userId).populate('documents');
        console.log("user object is ",user);
        if(user)
        {
            const documents = user.documents;
            console.log("documents are",documents);
            res.status(200).json({
                message:documents,
            })
        }
        else{
            res.status(400).json({
                error:"user is not a valid"
            })
        }
        
    } catch (error) {

        console.log("Error in fetchDocuments controller ",error.message);
        res.status(500).json({error:"Internal server error"});       
    }

}

export const updateDocumentName = async (req,res)=>
{
    try {
        const { docId, updatedName } = req.body;
        if (!docId || !updatedName) {
            throw new Error("Required fields are missing");
        }
    
        console.log("doc id is ", docId);
        console.log("updated name is ", updatedName);
    
        const document = await Document.findOne({ _id: docId });
        // console.log("document is ",document);
        
        if (document) {
            const updateResult = await Document.updateOne({ _id: docId }, { name: updatedName });
            console.log("updated result is ",updateResult);
            if (updateResult.modifiedCount > 0) {
                res.status(200).json({ message: "Document name updated" });
            } else {
                throw new Error("Error in updating document name");
            }
        } else {
            res.status(400).json({ error: "Document is not available" });
        }
    } catch (error) {
        console.log("Error in updateDocumentName controller ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteDocumentName = async (req,res)=>
{
    try {
        const {docId} = req.body;
        if (!docId) {
            throw new Error("Required fields are missing");
        }
    
        console.log("doc id is ", docId);
    
        const document = await Document.findOne({ _id: docId });
        // console.log("document is ",document);
        
        if (document) {
            const updatedResult = await Document.deleteOne({_id:docId});
            //const updateResult = await Document.updateOne({ _id: docId }, { name: updatedName });
            console.log("updated result is ",updatedResult);
            if (updatedResult.deletedCount > 0) {
                res.status(200).json({ message: "Document deleted" });
            } else {
                throw new Error("Error in deleting document name");
            }
        } else {
            res.status(400).json({ error: "Document is not available" });
        }
    } catch (error) {
        console.log("Error in updateDocumentName controller ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const fetchDocument = async (req,res)=>
{
    try {

        const {docId} = req.body;
        console.log("doc id is ",docId);
        if (!docId) {
            throw new Error("Required fields are missing");
        }
    
        console.log("doc id is ", docId);
    
        const document = await Document.findOne({ _id: docId });
        // console.log("document is ",document);
        
        if (document) {   
            res.status(200).type('application/pdf').send(document.data);
         } else {
            res.status(400).json({ error: "Document is not available" });
        }
    } catch (error) {
        console.log("Error in fetchDocument controller ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}