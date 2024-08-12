
const express = require("express")
const { CreateNote, UpdateNote, DeleteNote, GetNotes } = require("../controllers/notesController")
const isAuthenticated = require("../middlewares/Authenticated")

const NotesRouter = express.Router()

NotesRouter.post("/create", isAuthenticated, CreateNote)
NotesRouter.put("/update/:id", isAuthenticated, UpdateNote)
NotesRouter.delete("/delete/:id", isAuthenticated, DeleteNote)
NotesRouter.get("/getnotes", isAuthenticated, GetNotes)

module.exports = NotesRouter