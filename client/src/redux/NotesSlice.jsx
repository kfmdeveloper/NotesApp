import { createSlice } from "@reduxjs/toolkit"

const NotesSLice = createSlice({
    name: "notes",
    initialState: {
        notes: null
    },
    reducers: {
        SetNotes: (state, action) => {
            state.notes = action.payload
        }
    }


})
export const { SetNotes } = NotesSLice.actions
export default NotesSLice.reducer