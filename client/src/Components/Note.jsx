import React, { useEffect } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { format } from "date-fns"
import { LuCopy } from "react-icons/lu";
import { toast } from 'react-toastify';
import { SucessSound } from './SuccessSound';
const Note = ({ note, onDelete, GetNoteId, setshowUpdate, setShareShow, setDelShow, setdeleteNoteTitle }) => {

    const HandlerDelteNote = () => {
        setDelShow("flex")
        onDelete(note._id)
        setdeleteNoteTitle(note.title)

    }
    const UpdateHandler = (e) => {
        const preValue = note.title
        GetNoteId(note._id, preValue)
        setshowUpdate("flex")
    }

    const Sharehandler = () => {
        navigator.clipboard.writeText(note.title)
        toast.success("Note Copied", { autoClose: 1200 })
        SucessSound()
    }
    const FormattedDate = format(new Date(note.createdAt), 'dd MMMM, yyyy')
    const FormattedTime = format(new Date(note.createdAt), ' hh:mm')
    return (
        <div>
            <div className=" w-[255px] rounded-md bg-blue-950  px-3 pt-4 pb-1 flex flex-col space-y-5" >


                <div className="bg-gray-800 shadow-md  shadow-orange-600  overflow-hidden text-white p-3 rounded-sm">
                    <p>{note.title} </p>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-[12px] text-white">{FormattedDate}</p>
                        <p className="text-orange-500 text-[13px]">{FormattedTime}</p>
                    </div>
                    <div className="flex gap-3 items-center justify-center text-white">

                        < MdDeleteForever onClick={HandlerDelteNote} className="hover:cursor-pointer hover:text-black" size={"23px"} />
                        <BsPencilSquare onClick={UpdateHandler} className="hover:cursor-pointer hover:text-red-700" size={"20px"} />
                        <LuCopy onClick={Sharehandler} className="hover:cursor-pointer hover:text-orange-500" size={"20px"} />
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Note
