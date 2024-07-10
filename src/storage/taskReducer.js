import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "task",
    initialState: { data: [] },
    reducers: {
        fetch: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const taskAction = taskSlice.actions;
export default taskSlice.reducer;
