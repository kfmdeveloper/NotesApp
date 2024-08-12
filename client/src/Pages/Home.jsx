import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Note from '../Components/Note'
import { useSelector } from 'react-redux'
import NotesModal from '../Components/NotesModal'
import Add from '../Components/Add'
import { FaCircleUser } from "react-icons/fa6";
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from "react-redux"
import { SetNotes } from "../redux/NotesSlice"
import UpdateNoteModal from '../Components/UpdateNoteModal'
import { PlaySound } from '../Components/PlaySound'
import { NoteSound } from '../Components/NoteSound'
import { FaShareNodes } from "react-icons/fa6"; //share
import { DiUnitySmall } from "react-icons/di"; //personal logo
import { FaAngleDoubleLeft } from "react-icons/fa"; //close Sidebar
import { FaAngleDoubleRight } from "react-icons/fa"; //open sidebar
import { GrDownload } from "react-icons/gr"; //downlaod
import { IoHome } from "react-icons/io5";
import { MdContactSupport } from "react-icons/md";
import DownloadModal from '../Components/DownloadModal'
import { format } from 'date-fns'
import { DeleteSound } from '../Components/DeleteSound'
import DeleteModal from '../Components/DeleteModal'
import ShareNotes from '../Components/ShareNotes'
const Home = () => {

    const [show, setshow] = useState("hidden")
    const [notes, setnotes] = useState([])
    const [Id, setId] = useState("")
    const [showUpdate, setshowUpdate] = useState("hidden")
    const [Uvalue, setUvalue] = useState("")
    const dispatch = useDispatch()
    const { authUser } = useSelector((store) => store.user)
    const [ActiveIndex, setActiveIndex] = useState(0)
    const [DonShow, setDonShow] = useState("hidden")
    const [hide, sethide] = useState("flex")
    const [active, setactive] = useState("hidden")
    const [DelShow, setDelShow] = useState("hidden")
    const [deleteId, setdeleteId] = useState("")
    const [deleteNoteTitle, setdeleteNoteTitle] = useState("")
    const [noteURL, setnoteURL] = useState("")
    const [ShareShow, setShareShow] = useState("hidden")
    const handleClick = (index) => {
        setActiveIndex(index)
        if (index === 2) {
            setDonShow("flex")
        }
    }
    useEffect(() => {
        const getNotes = async () => {
            try {
                const res = await axios.get("http://localhost:3000/notes/getnotes", {
                    withCredentials: true
                })
                setnotes(res.data.Notes)

                dispatch(SetNotes(res.data.Notes))
            } catch (error) {

                if (error.response && error.response.data && error.response.data.message) {
                    toast.success(error.response.data.message, { autoClose: 1000 })
                    PlaySound()
                } else {
                    toast.success("An unexpected error occurred!", { autoClose: 1000 })
                    PlaySound()
                }

            }
        }
        getNotes()
    }, [dispatch])

    const FormattedDate = format(new Date(Date.now()), 'dd,MMMM,yyyy hh:mm')


    const AddNote = async (title, settitle) => {


        try {

            const res = await axios.post("http://localhost:3000/notes/create", { title }, { withCredentials: true })
            if (res.data && res.data.Notes) {
                setnotes((prev) => [...prev, res.data.Notes]);

                // Ensure res.data.Note exists
                toast.success(res.data.message, { autoClose: 1000 });
                NoteSound()
                settitle(""); // Clear input
            } else {
                PlaySound()
                toast.error("Unexpected response structure");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.success(error.response.data.message, { autoClose: 1000 })
                PlaySound()

            } else {
                toast.success("An unexpected error occurred!", { autoClose: 1000 })
                PlaySound()
            }

        }

    }

    const getDeleteId = async (noteId) => {
        setdeleteId(noteId)
    }
    const DeleteNotehandler = async () => {

        try {
            const res = await axios.delete(`http://localhost:3000/notes/delete/${deleteId}`, {
                withCredentials: true
            })
            setnotes(prevNotes => prevNotes.filter(note => note._id !== deleteId));
            toast.success(res.data.message, { autoClose: 1000 })
            DeleteSound()
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.success(error.response.data.message, { autoClose: 1000 })
                PlaySound()

            } else {
                toast.success("An unexpected error occurred!", { autoClose: 1000 })
                PlaySound()
            }
        }

    }
    const GetNoteId = (NoteId, preValue) => {
        setId(NoteId)
        setUvalue(preValue)

    }
    const UpdateNote = async (title) => {

        try {
            const res = await axios.put(`http://localhost:3000/notes/update/${Id}`, { title }, { withCredentials: true })
            setnotes(prevNotes =>
                prevNotes.map(note =>
                    note._id === Id ? res.data.UpdateNotes : note
                )
            );
            NoteSound()
            toast.success(res.data.message, { autoClose: 1200 })
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.success(error.response.data.message, { autoClose: 1000 })
                PlaySound()

            } else {
                toast.success("An unexpected error occurred!", { autoClose: 1000 })
                PlaySound()
            }
        }
    }

    const HandleSupport = (e) => {
        e.preventDefault()

    }
    const AccountDate = format(new Date(authUser.createdAt), 'dd MMMM, yyyy , dd:mm')
    const downloadNotesAsText = () => {
        const headerText = `\n \t \n 
        ========================================
           >>> Thanks for using INoteBook <<<
        ========================================

        \n\n--DEVELOPED BY : 

         ==============================
             >>> KHALID FAROOQ <<<
         ==============================

 \n---Your Account Information---\n\n
        Name : ${authUser.name}
        email: ${authUser.email}
        TotalNotes : ${notes.length}
        Created Account: ${AccountDate}
        Downloaded At: ${FormattedDate}\n\n
        All Notes: \n

`
        const text = headerText + notes.map(note => note.title).join("\n\n");
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${authUser.name} Notes.txt`;
        document.body.appendChild(link);
        link.click();
        toast.success("Downloaded Successfully", { autoClose: 1200 })
        NoteSound()
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

    };
    const ShareURLNotes = () => {
        const header = `\n ---Developed by => >>>>KHALID FAROOOQ <<<<<<<<\n\n Link:`
        const Text = header + notes.map(note => note.title)
        const blob = new Blob([Text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        setnoteURL(url)
    }
    const ShareHandler = () => {
        handleClick(1)
        ShareURLNotes()
        setShareShow("")

    }
    const SidebarHanlder = () => {
        sethide("hidden")
        setactive("")

    }
    const RightSidebarHandler = () => {
        sethide("")
        setactive("hidden")
    }

    return (
        <>
            <div className="flex h-screen">


                <div className={` ${hide} w-[16%] shadow-md  bg-blue-950 text-white space-y-16  shadow-gray-500   flex-col items-center justify-between  py-6`}>

                    <div className="w-full">
                        <div className="flex justify-end">
                            < FaAngleDoubleLeft onClick={SidebarHanlder} className="hover:cursor-pointer" size={"30px"} />
                        </div>
                        <div className="flex-col mb-3 space-y-2 flex items-center">
                            <div>
                                <DiUnitySmall size={"110px"} />
                                <h1 className="  text-2xl font-bold">iNoteBook</h1>
                            </div>
                            <hr className="w-32 h-2 my-2" />

                        </div>

                        {/* Tabs */}

                        <div className="py-2">
                            <div onClick={() => handleClick(0)} className={` flex items-center space-x-2 ${ActiveIndex === 0 ? 'bg-white text-black' : 'hover:bg-red-600 hover:text-black'}  cursor-pointer py-2 pl-7  w-full`}>
                                <IoHome size={"20px"} />
                                <h1 className="text-[17px] font-semibold">Home</h1>
                            </div>
                            <div onClick={ShareHandler} className={`flex items-center space-x-2 ${ActiveIndex === 1 ? 'bg-white text-black' : 'hover:bg-red-600 hover:text-black'} cursor-pointer py-2  pl-7   w-full`}>
                                <FaShareNodes size={"20px"} />
                                <h1 className="text-[17px] font-semibold">Share Notes</h1>
                            </div>
                            <div onClick={() => handleClick(2)} className={`flex items-center space-x-2 ${ActiveIndex === 2 ? 'bg-white text-black' : 'hover:bg-red-600 hover:text-black'} cursor-pointer py-2  pl-7   w-full`}>
                                <GrDownload size={"20px"} />
                                <h1 className="text-[17px] font-semibold">Download</h1>
                            </div>
                            {/* <div onClick={() => handleClick(3)} className={`flex items-center space-x-2 ${ActiveIndex === 3 ? 'bg-white text-black' : 'hover:bg-red-600 hover:text-black'} cursor-pointer py-2 pl-7   w-full`}>
                                <GrCloudDownload size={"20px"} />
                                <h1 className="text-[17px] font-semibold">Upload Cloud</h1>
                            </div>
                            <div onClick={() => handleClick(4)} className={`flex items-center space-x-2 ${ActiveIndex === 4 ? 'bg-white text-black' : 'hover:bg-red-600 hover:text-black'} cursor-pointer py-2 pl-7   w-full`}>
                                <GrCycle size={"20px"} />
                                <h1 className="text-[17px] font-semibold">Recycle Bin</h1>
                            </div> */}


                            <a className="font-semibold " href="mailto:khalid@gmail.com"><div onClick={() => handleClick(5)} className={`flex items-center space-x-2 ${ActiveIndex === 5 ? 'bg-white text-black' : 'hover:bg-red-600 hover:text-black'} cursor-pointer py-2 pl-7   w-full`}>
                                <MdContactSupport size={"25px"} />
                                <span className='ml-1'> Support</span> </div>
                            </a>

                        </div>
                    </div>
                    <div className="flex  gap-2 items-center justify-center">
                        <FaCircleUser size={"40px"} />
                        <h1 className="font-bold">{authUser.name}</h1>
                    </div>
                </div>
                <div className={`${active} justify-end absolute mt-[90px]`}>
                    < FaAngleDoubleRight onClick={RightSidebarHandler} className="hover:cursor-pointer text-blue-950" size={"30px"} />
                </div>
                <div className="w-full">
                    <Navbar authUser={authUser} setshow={setshow} />

                    {
                        notes && notes.length > 0 ? (
                            <div className="grid grid-cols-4 gap-y-3 px-4 pl-8 pt-8">
                                {
                                    notes.map((note) => (
                                        note ? (
                                            <Note
                                                GetNoteId={GetNoteId}
                                                onUpdate={UpdateNote}
                                                setshowUpdate={setshowUpdate}
                                                onDelete={getDeleteId}
                                                note={note}
                                                key={note._id}
                                                authUser={authUser}
                                                setDelShow={setDelShow}
                                                setdeleteNoteTitle={setdeleteNoteTitle}
                                                setShareShow={setShareShow}
                                            />
                                        ) : null
                                    ))


                                }
                                {
                                    notes && notes.length > 0 ? <div className='w-[255px] rounded-md bottom-4 border border-x-2 bg-slate-100 border-y-2 border-dashed  border-separate border-blue-950 flex justify-center items-center  p-3  space-y-5'>
                                        <Add setshow={setshow} />
                                    </div> : null
                                }

                            </div>
                        ) : (
                            <div className="flex flex-col gap-5 items-center justify-center h-[400px]">
                                <div className='w-[255px] rounded-md bottom-4 border border-x-2 bg-slate-100 border-y-2 border-dashed  border-separate border-blue-950 flex justify-center items-center py-8 p-3  space-y-5'>
                                    <Add setshow={setshow} />
                                </div>
                                <h1 className="text-3xl text-center">{`Dear ${authUser.name}, You haven't added any notes yet!`}</h1>
                            </div>
                        )
                    }

                </div>

            </div>
            <div className={`${show}`}>
                <NotesModal authUser={authUser} AddNote={AddNote} setshow={setshow} />

            </div>
            <div className={`${showUpdate}`}>
                <UpdateNoteModal authUser={authUser} Uvalue={Uvalue} UpdateNote={UpdateNote} setshowUpdate={setshowUpdate} />
            </div>
            <div className={`${DonShow}`}>
                <DownloadModal setActiveIndex={setActiveIndex} downloadNotesAsText={downloadNotesAsText} setDonShow={setDonShow} authUser={authUser} />
            </div>
            <div className={`${DelShow}`}>
                <DeleteModal deleteNoteTitle={deleteNoteTitle} DeleteNotehandler={DeleteNotehandler} authUser={authUser} setDelShow={setDelShow} />
            </div>
            <div className={`${ShareShow}`}>
                <ShareNotes noteURL={noteURL} setShareShow={setShareShow} setActiveIndex={setActiveIndex} />
            </div>

        </>
    )

}

export default Home
