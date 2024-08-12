import React from 'react'
import { GrYoutube } from "react-icons/gr";
import { IoCopySharp } from "react-icons/io5";
import { FaSquareInstagram } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";
import { toast } from 'react-toastify';
import { FaRegWindowClose } from "react-icons/fa";
import { SucessSound } from './SuccessSound';
import { PlaySound } from './PlaySound';
const ShareNotes = ({ noteURL, setShareShow, setActiveIndex }) => {

    const copyHandler = () => {

        try {
            navigator.clipboard.writeText(noteURL)
            toast.success("Link Copied", { autoClose: 1200 })
            SucessSound()
        } catch (error) {
            toast.error("error")
            PlaySound()
        }
    }
    const Closehandler = () => {
        setActiveIndex(0)
        setShareShow("hidden")
    }
    return (

        <div>
            <div className={` relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true`}>

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className=" relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full  sm:max-w-lg">


                            <div className='flex bg-lime-500 px-2 py-2  items-center justify-between text-center'>
                                <h3 className="  py-2 px-2  text-gray-900 text-2xl font-bold text-center"  >Share with

                                </h3>

                                <div onClick={Closehandler} className='hover:text-blue-800 hover:cursor-pointer'>
                                    <FaRegWindowClose className="mr-3 " size={"30px"} />
                                </div>

                            </div>


                            <div className="px-3 py-6">

                                <div className="flex flex-col gap-2 items-center justify-center ">
                                    <div className="flex space-x-2 items-center justify-center">
                                        <a target='_blank' href="https://www.youtube.com/@KhalidFarooq5">
                                            <div className="w-14 h-14 border border-black  hover:cursor-pointer hover:bg-black hover:text-white rounded-full flex items-center justify-center">
                                                <GrYoutube color='red' size={"40px"} />
                                            </div>
                                        </a>
                                        <a target='_blank' href="https://www.instagram.com/">
                                            <div className="w-14 h-14 border border-black  hover:cursor-pointer hover:bg-black hover:text-white rounded-full flex items-center justify-center">
                                                <FaSquareInstagram color='green' size={"40px"} />
                                            </div>
                                        </a>
                                        <a onClick={copyHandler}>
                                            <div className="w-14 h-14 border border-black hover:cursor-pointer hover:bg-black hover:text-white rounded-full flex items-center justify-center">
                                                <IoCopySharp size={"40px"} />
                                            </div>
                                        </a>
                                        <a target='_blank' href="https://github.com/kfmdeveloper">
                                            <div className="w-14 h-14 border border-black hover:cursor-pointer hover:bg-black hover:text-white rounded-full flex items-center justify-center">
                                                <CgMoreO color='green' size={"40px"} />
                                            </div>

                                        </a>
                                    </div>
                                    <hr className="text-center text-black border border-black w-[70%]" />
                                </div>
                                <div className="pl-7 pt-7">
                                    <p className='font-bold text-center'><span className="font-semibold">Developed By: </span> KHALID FAROOQ</p>

                                </div>
                            </div>


                            {/* <div className="bg-gray-50 flex justify-between px-4 py-2 sm:flex sm:flex-row-reverse sm:px-6">

                                <div>
                                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                                    <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete Note</button>

                                </div>


                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ShareNotes
