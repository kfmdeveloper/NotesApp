
import { createSlice } from "@reduxjs/toolkit"

const UserSlice = createSlice({
    name: "user",
    initialState: {
        authUser: null,
        isAuthenticated: false
    },
    reducers: {
        SetAuthUser: (state, acion) => {
            state.isAuthenticated = true
            state.authUser = acion.payload
        },
        LogedoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
})

export const { SetAuthUser, LogedoutUser } = UserSlice.actions
export default UserSlice.reducer