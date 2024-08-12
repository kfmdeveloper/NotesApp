import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { SetAuthUser } from '../redux/UserSlice'
import { PlaySound } from '../Components/PlaySound'
import { SucessSound } from '../Components/SuccessSound'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const EmailHandler = (e) => {
        setUser({ ...user, email: e.target.value })

    }
    const PasswordHandler = (e) => {
        setUser({ ...user, password: e.target.value })
    }

    const SubmitHandler = (e) => {
        e.preventDefault()
        const email = user.email
        const password = user.password
        if (!email.includes("@gmail.com")) {
            toast.error("invalid email", {
                autoClose: 1000
            })
            PlaySound()
        }
        else if (password.length < 7) {
            toast.error("Password is too short!", {
                autoClose: 1000
            })
            PlaySound()
        }
        else {

            const API_ENDPoint = "http://localhost:3000/user/login"

            const LoginUser = async () => {
                try {
                    const res = await axios.post(API_ENDPoint, user, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredentials: true
                    })
                    toast.success(res.data.message, { autoClose: 1000 })
                    SucessSound()
                    dispatch(SetAuthUser(res.data.user))
                    navigate("/")
                } catch (error) {
                    if (error.response && error.response.data && error.response.data.message) {
                        toast.error(error.response.data.message, { autoClose: 1200 })
                        PlaySound()
                    } else {
                        toast.error("An unexpected error occurred, Try again!", { autoClose: 1200 })
                        PlaySound()
                    }
                }

            }
            LoginUser()

        }
    }

    return (
        <div className="mainDiv w-full h-screen flex items-center justify-center  ">

            <div className=" w-1/4 h-[70%] rounded-lg shadow-md p-6 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">

                <form onSubmit={SubmitHandler} className="flex flex-col space-y-5">

                    <h1 className="text-center text-2xl font-bold py-2">Login</h1>
                    <div className=" flex flex-col space-y-2">

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="email" className="font-semibold">Email</label>
                            <input onChange={EmailHandler} value={user.email} className=" border-none outline-red-600 py-1 px-2 rounded-sm" type="text" id="email" placeholder="Enter email" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="password" className="font-semibold">Password</label>
                            <input onChange={PasswordHandler} value={user.password} className=" border-none outline-red-600 py-1 px-2 rounded-sm" type="password" id="password" placeholder="Enter password" />
                        </div>
                        <div>
                            <p className=" text-sm text-white">Didn't have an account?<Link className="text-orange-500 hover:text-[15px] hover:duration-150 px-2 underline" to={"/register"}>Register</Link></p>
                        </div>
                    </div>
                    <div >
                        <button className="w-full mt-6 bg-red-200 text-black py-1 rounded-sm hover:bg-blue-600 hover:duration-200 hover:text-white border-none outline-none " type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
