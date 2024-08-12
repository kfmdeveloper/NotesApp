const express = require("express")
require("dotenv").config("./env")
const app = express()
const DbConnection = require("./utils/DbConnection.js")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const Auth = require("./routes/Auth.js")
const NotesRouter = require("./routes/Notes.js")

//Midlewares

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true

}))


//     1-User Routes

app.use("/user", Auth)

//     2-Notes Routes

app.use("/notes", NotesRouter)


//Db connection

DbConnection()


//PORT

const PORT = 3000 || process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is listening at the PORT : http://localhost:${PORT}`);

})