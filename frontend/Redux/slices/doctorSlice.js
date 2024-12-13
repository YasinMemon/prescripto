import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    doctors: [],
    speciality : ''
}

const docSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {
        fetchDoc: (state, action) => {
            state.doctors = action.payload.doctors
            state.speciality = action.payload.speciality
        },
    }
});

export const { fetchDoc } = docSlice.actions
export default docSlice.reducer