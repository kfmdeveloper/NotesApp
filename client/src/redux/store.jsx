import { configureStore } from "@reduxjs/toolkit"
import UserSlice from "./UserSlice"
import NotesSlice from "./NotesSlice"

const Store = configureStore({
    reducer: {
        user: UserSlice,
        notes: NotesSlice
    }
})

export default Store