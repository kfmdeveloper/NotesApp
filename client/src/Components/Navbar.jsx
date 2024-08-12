import React from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { LogedoutUser } from "../redux/UserSlice"
import Add from './Add'
const Navbar = ({ setshow, authUser }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const Submithandler = (e) => {
        e.preventDefault()
        const LogoutUser = async () => {
            try {
                const res = await axios.get("http://localhost:3000/user/logout", {
                    withCredentials: true
                })
                console.log(res);
                toast.success(res.data.message, { autoClose: 1000 })
                dispatch(LogedoutUser())
                navigate("/login")
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message, { autoClose: 1000 })
                }
            }
        }
        LogoutUser()
    }



    return (
        <form onSubmit={Submithandler} className=" flex items-center   px-8 h-20 shadow-lg  justify-between">
            <div className='flex gap-3 items-center'>
                <Add setshow={setshow} />
                <div className=" " >
                    <input id="search" className=" hover:duration-500 w-[300px] py-3 rounded-[30px] px-5 shadow-md outline-none border-none bg-slate-300" type="text" placeholder='Search' />
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <button type="submit" className="bg-blue-950 py-2 px-7 rounded-full text-white font-semibold hover:bg-red-600 hover:duration-200">Logout</button>
                <div className='flex w-11 h-11 rounded-full border border-blue-700 hover:cursor-not-allowed items-center justify-center '>
                    <h1 className=' text-black text-3xl font-bold'>{authUser.email.charAt([0]).toUpperCase()}</h1>
                </div>
            </div>
        </form>
    )
}

export default Navbar
