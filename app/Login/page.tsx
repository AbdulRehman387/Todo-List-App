"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PiEyeClosed, PiEye } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";


const Login = () => {
    const router = useRouter()
    const [hidden, setHidden] = useState(true)
    const [type, setType] = useState("password")
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const onChangeHandler = (e: any) => {
        setError("")
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onClickHandler = async (e: any) => {
        setLoader(true)
        const result: any = await signIn("credentials", {
            redirect: false, ...user
        })
        if (result.ok) {
            router.push("/")
        }
        else {
            setLoader(false)
            console.log("error");
            setError("email or password doesn't match")
        }
    }
    return (
        <div className="flex justify-center items-center w-[100vw] h-[100vh]">
            <div className="w-[400px] h-[470px] border rounded-xl">
                <h1 className="text-4xl font-bold text-center mt-12">Login</h1>
                <div className="flex flex-col justify-center items-center gap-y-5 mt-10">
                    <div className="flex flex-col gap-y-2">
                        <h2 className="text-xl font-semibold">Email</h2>
                        <Input onChange={onChangeHandler} name="email" value={user.email} className="w-[300px] text-lg bg-white border border-black"></Input>
                    </div>
                    <div className="flex flex-col gap-y-2 relative">
                        <h2 className="text-xl font-semibold">Password</h2>
                        <div className="flex relative">
                            <Input onChange={onChangeHandler} name="password" value={user.password} className="w-[300px] text-lg bg-white border border-black" type={type}></Input>
                            <div className="absolute right-2 top-2">
                                <PiEyeClosed onClick={() => { setHidden(false); setType("text") }} style={{ display: hidden ? "block" : "none" }} className="text-2xl cursor-pointer" />
                                <PiEye onClick={() => { setHidden(true); setType("password") }} style={{ display: hidden ? "none" : "block" }} className="text-2xl cursor-pointer" />
                            </div>
                        </div>
                        <h3 className="text-red-500">{error}</h3>
                        <h3 className="mt-2">Don&apos;t have an account?<span className="font-bold ml-2 hover:underline cursor-pointer"><Link href={"/Signup"}>Sign up</Link></span></h3>
                    </div>
                    <div className="mt-5">
                        <Button onClick={onClickHandler} className="w-32 text-lg font-bold">{loader ? <div className="relative bottom-4 right-3">
                            <div className="w-8 h-8 rounded-full absolute border-4 border-solid border-gray-200"></div>
                            <div
                                className="w-8 h-8 rounded-full animate-spin absolute  border-4 border-solid border-black border-t-transparent">
                            </div>
                        </div> : "Login"}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login