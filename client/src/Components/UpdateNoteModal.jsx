import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { PlaySound } from './PlaySound'

const UpdateNoteModal = ({ setshowUpdate, UpdateNote, authUser, Uvalue }) => {
    const [title, settitle] = useState("")

    const SubmitHanlder = (e) => {
        e.preventDefault()
        if (title.length <= 0) {
            toast.error("Title is required", { autoClose: 1200 })
            PlaySound()
        } else {
            UpdateNote(title)
        }


    }
    return (
        <div>
            <div className={` relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true`}>

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <form onSubmit={SubmitHanlder} className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full p-4 sm:max-w-lg">
                            <div className="px-5 my-5 flex flex-col space-y-4">
                                <div className="flex justify-between">
                                    <h3 className=" leading-6 text-gray-900 text-2xl font-bold" id="modal-title">Update Note</h3>
                                    <p>{authUser.name}</p>
                                </div>
                                <div className="flex flex-col gap-2 items-center justify-center ">

                                    <div className='flex items-center mt-3  gap-7 w-[300px]'>
                                        <p className="self-start text-[16px] font-bold">Previous Note : </p>
                                        <p className='font-semibold text-xl'> {Uvalue}</p>
                                    </div>
                                    <hr className="text-center  text-black border border-black w-[80%]" />
                                </div>
                                <div className="w-full border">
                                    <p className=" px-2 text-orange-500 bg-orange-900">Notes length is unreachable</p>
                                    <textarea onChange={(e) => { settitle(e.target.value) }} value={title} className="  outline-none w-full py-5 px-2 rounded-sm" type="text" id="name" placeholder="Enter your Note..." />
                                    <p className="text-[12px] px-1 text-gray-500 py-1">{title.length.toString()}</p>
                                </div>

                            </div>
                            <div className="bg-gray-50 flex justify-between px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <div>
                                    <button onClick={() => setshowUpdate("hidden")} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                                    <button onClick={() => setshowUpdate("hidden")} type="submit" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Update Note</button>

                                </div>
                                <button onClick={(e) => (settitle(""))} type="button" className="  w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Clear Note</button>


                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateNoteModal
