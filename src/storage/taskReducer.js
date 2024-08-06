import { createSlice } from "@reduxjs/toolkit";
import { Heap } from "../components/heap";

const taskSlice = createSlice({
    name: "task",
    initialState: { data: [], isGeneratedRandomTask: false },
    reducers: {
        fetch: (state, action) => {
            state.data = action.payload;
        },
        insertTask: (state, action) => {
            state.data.insert(action.payload);
            state.data = new Heap(state.data.arr, state.data.sortedHeap);
        },
        insertManyTasks: (state, action) => {
            state.data.insertMany(action.payload);
            state.data = new Heap(state.data.arr, state.data.sortedHeap);
            state.isGeneratedRandomTask = true;
        },
        resolveTask: (state, action) => {
            let task = action.payload;
            task.setResolved();
            state.data.delete(task);
            state.data = new Heap(state.data.arr, state.data.sortedHeap);
        },
        updateTask: (state, action) => {
            let task = action.payload.task;
            let newData = action.payload.data;
            state.data.updateElement(task, newData);
            state.data = new Heap(state.data.arr, state.data.sortedHeap);
        },
    },
});

export const taskAction = taskSlice.actions;
export default taskSlice.reducer;
