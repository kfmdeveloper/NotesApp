const mongoose = require("mongoose")

const NotesSchema = mongoose.Schema({
    title: {
        type: String
    },
    userId: {
        type: String
    }
}, {
    timestamps: true
})

const Note = mongoose.model("Note", NotesSchema)

module.exports = Note