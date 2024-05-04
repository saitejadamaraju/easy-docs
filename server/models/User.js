import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    documents: [{
        type: String,
        ref: 'Document'
    }]
});
// Create a unique index for the documents array
userSchema.path('documents').validate(function(value) {
    return new Set(value).size === value.length;
}, 'Duplicate documents are not allowed');

const User = mongoose.model("User", userSchema);

export default User;
