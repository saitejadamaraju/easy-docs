import {Server} from 'socket.io';
import path from 'path';
import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import connectToMongoDB from './db/connectToMongoDB.js';
import Document from './models/Document.js';
import User from './models/User.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import documentRoutes from './routes/document.routes.js';
import userRoutes from './routes/user.routes.js';

const PORT = process.env.PORT || 5000;
dotenv.config();

const __dirname=path.resolve();

const defaultValue="";

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth',authRoutes);
app.use('/api/user',documentRoutes);
app.use('/api/user',userRoutes);

app.use(express.static(path.join(__dirname,"/client/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client","dist","index.html"));
})

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server is running in port ${PORT}`);
})


io.on("connection" , socket=>{
    console.log("connected");
    socket.on("get-document", async (userId,documentId)=>{
        console.log("userid is ",userId);
        console.log("documentId is ",documentId);
        const document= await findorCreatedocument(userId,documentId);
        socket.join(documentId);
        if(document)
        {socket.emit("load-document",document.data);}

        socket.on("send-changes", delta=>{
            socket.broadcast.to(documentId).emit("receive-changes",delta)
        })

        socket.on("save-document", async data =>
        {
            await Document.findByIdAndUpdate(documentId,{data});
        })
    })
})

async function findorCreatedocument(userId,docId)
{
  
    try
    {

    if(userId==null || docId==null) return;
    
    //checking document is there or not in documents table
    const document= await Document.findById(docId);
    console.log("document is ",document);

    //checking user is there or not in users table
    const user = await User.findById(userId);
    //console.log(user);
    let newDocument;

    if(!document) 
    {
      console.log("inside creating new Document");
      newDocument = await Document.create({_id:docId,data:defaultValue})
      user.documents.push(newDocument);
      await user.save();
      return newDocument;
    }
    else
    { 
        console.log("inside fetching ")
        if(document)
        {
            const isLinked = user.documents.indexOf(docId);
            if(isLinked !==-1)
            {
                return document;
            }
            throw new Error("user doesn't have access to this document");
        }    
    }

    }
    catch(error)
    {
       console.log(error.message);
    }
    

}