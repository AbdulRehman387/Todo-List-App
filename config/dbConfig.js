import mongoose from "mongoose";

const connection = {}

export const dbConnect = async()=>{
    if(connection.isConnected){
        return
    }
    const db = await mongoose.connect("mongodb+srv://AbdulRehman387:JD2ADQRhmyuFy2st@todolist.zpneh.mongodb.net/TodoList")
    connection.isConnected = mongoose.connections[0].readyState
}