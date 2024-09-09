import { dbConnect } from "@/config/dbConfig";
import { User } from "@/models/userModel";
import { getServerSession } from "next-auth";

dbConnect()
export async function POST(req){
    const session = await getServerSession()
    const body = await req.json()
    const user = await User.updateOne(
        {"user.email": session.user.email},
        {$push: {todos: body}})
    return Response.json({message: "Success", user: user})
}

export async function DELETE(req){
    const session = await getServerSession()
    const body = await req.json()
    const user = await User.updateOne(
        {"user.email": session.user.email},
        {$pull: {todos: body}})
    return Response.json({message: "Success", user: user})
}

export async function PUT(req){
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get("index")
    const session = await getServerSession()
    const body = await req.json()
    const user = await User.updateOne(
        {"user.email": session.user.email},
        {$set: {[`todos.${query}`]: body}})
    return Response.json({message: "Success", user: user})
}

export async function GET(){
    const session = await getServerSession()
    const user = await User.findOne({"user.email": session.user.email})
    return Response.json({todos: user.todos})
}