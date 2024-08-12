import React from 'react'

const DownloadModal = ({ authUser, setDonShow, downloadNotesAsText, setActiveIndex, Index }) => {

    const Downloadhanlder = () => {


        downloadNotesAsText()
        setDonShow("flex")

        setDonShow("hidden")
        setActiveIndex(0)
    }

    const CancleHandler = () => {
        setDonShow("hidden")
        setActiveIndex(0)
    }
    return (
        <div>
            <div className={` relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true`}>

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className=" relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full  sm:max-w-lg">


                            <div className='flex bg-red-600 px-2 py-2 justify-between items-center'>
                                <h3 className="  py-2 px-2 leading-6 text-gray-900 text-2xl font-bold" id="modal-title">Download</h3>

                            </div>


                            <div className="px-3 py-6">
                                <h1 className="text-2xl font-bold text-center">Say Thanks to:  Khalid Farooq </h1>
                                <div className="flex items-center justify-center ">
                                    <hr className="text-center text-black border border-black w-[70%]" />
                                </div>
                                <div className="pl-7 pt-7">
                                    <p className='font-semibold'>Dear {authUser.name}, Do you want to download all notes?</p>

                                </div>
                            </div>


                            <div className="bg-gray-50 flex justify-between px-4 py-2 sm:flex sm:flex-row-reverse sm:px-6">

                                <div>
                                    <button onClick={CancleHandler} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                                    <button onClick={Downloadhanlder} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Download</button>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DownloadModal
