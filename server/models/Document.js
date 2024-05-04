import mongoose from "mongoose";

const documentSchema= new mongoose.Schema({
  
    _id:String,
    data:Object,
    name: {
        type: String,
        unique: true,
        default: "Untitled Document"
    },
    users:[
        {
            type: String,
            ref: 'User'
        }
    ]


},{ timestamps: true });

const Document = mongoose.model("Document",documentSchema);

export default Document;