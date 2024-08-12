const Note = require("../models/NotesModel.js")
const User = require("../models/UserModel.js")
const jwt = require("jsonwebtoken")
const CreateNote = async (req, res) => {

    try {
        const { title } = req.body
        if (!title) {
            return res.status(403).json({
                success: false,
                message: "Title is required!"
            })
        }
        const userId = req.userId

        const NewNote = new Note({ title, userId })
        await NewNote.save()
        return res.status(200).json({
            success: true,
            message: "Note Created Successfully",
            Notes: NewNote
        })
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

//Update notes

const UpdateNote = async (req, res) => {

    try {

        const { title } = req.body
        const NoteskiId = req.params.id
        const userId = req.userId


        const SearchNote = await Note.findById({ _id: NoteskiId })
        if (!SearchNote) {
            return res.status(404).json({
                success: false,
                message: "Note not Found!"
            })
        }

        const NotesUserId = SearchNote.userId

        if (userId !== NotesUserId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized user cannot take action due to high Privacy Policy!"
            })
        }

        const user = await User.findById({ _id: NotesUserId })

        const UpdateNotes = await Note.findByIdAndUpdate({ _id: NoteskiId }, {
            title
        }, { new: true })

        if (!UpdateNotes) {
            return res.status(500).json({
                success: false,
                message: "Error updating note!"
            });
        }
        return res.status(200).json({
            success: true,
            message: `Dear ${user.name}, Your Note Updated Successfully`,
            UpdateNotes

        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Delete Note

const DeleteNote = async (req, res) => {
    try {
        const NoteId = req.params.id
        const userId = req.userId

        const SearchedNote = await Note.findById({ _id: NoteId })
        if (!SearchedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found!"
            })
        }
        if (userId !== SearchedNote.userId) {
            return res.status(403).json({
                success: false,
                message: "Unathorized user cannot take action due to High Privacy Policy"
            })
        }

        const DeleteNote = await Note.findByIdAndDelete({ _id: NoteId })
        return res.status(200).json({
            success: true,
            message: "Note Deleted Successfully"
        })

    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message
        })
    }
}

//Getting Notes

const GetNotes = async (req, res) => {
    try {

        const userId = req.userId

        const Notes = await Note.find({ userId })

        if (!Notes) {
            return res.status(404).json({
                success: false,
                message: "No data Found!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Notes retrieved Successfully",
            Notes

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { CreateNote, UpdateNote, DeleteNote, GetNotes }