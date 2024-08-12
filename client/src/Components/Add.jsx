import React from 'react'
import { RiAddCircleFill } from "react-icons/ri";
const Add = ({ setshow }) => {
    return (
        <div className="hover:cursor-pointer" onClick={() => setshow("flex")}>
            <RiAddCircleFill className="rotate-hover text-blue-950" size={"60px"} />
        </div>
    )
}

export default Add
