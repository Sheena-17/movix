import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name :'home',
    initialState: {
        url: {},
        genres: {}
    },
    reducers : {
        getApiConfiguration: (state,action) => {
            state.url = action.payload;
        },
        getGenres: (state,action)=>{
            state.genres = action.payload;
        }
}
})
        
            // // Automatically generated action creator for the 'getApiConfiguration','getGenres' action
export const { getApiConfiguration,getGenres} = homeSlice.actions;
export default homeSlice.reducer;


