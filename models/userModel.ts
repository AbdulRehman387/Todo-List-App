import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user: {
        email:String,
        username:String,
        password:String
    },
    todos:[{
        content:String,
        isImportant:Boolean
    }]
})
export const User = mongoose?.models.todos || mongoose.model("todos", userSchema)