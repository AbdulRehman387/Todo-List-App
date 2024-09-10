import { dbConnect } from "@/config/dbConfig"
import { User } from "@/models/userModel"

dbConnect()

export async function POST(req: any) {
    // const body = await req.json()
    // const exists = await User.findOne({ "user.email": body.email })
    // if (exists) {
    //     return Response.json({ message: "error" })
    // }
    // const user = await User.create({ user: body, todos: [] })
    return Response.json({ message: "success" })
}