import { configureStore } from '@reduxjs/toolkit'
import doctorReducers from '../slices/doctorSlice.js'

const store = configureStore({
    reducer: {
        doctor: doctorReducers
    }
});

export default store