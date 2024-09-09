import { dbConnect } from "@/config/dbConfig";
import { User } from "@/models/userModel";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

dbConnect()
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { type: "text", label: "Email" },
                password: { type: "text", label: "Password" }
            },
            async authorize(credentials) {
                const user = await User.findOne({ "user.email": credentials.email })
                if (user) {
                    if (user.user.password === credentials.password)
                        return { email: user.user.email, name: user.user.username }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: "/Login"
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async redirect({ baseUrl }) {
            return baseUrl
        },
    },

})
export { handler as GET, handler as POST }