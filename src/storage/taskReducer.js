import { createSlice } from "@reduxjs/toolkit";
import { Heap } from "../components/heap";

const taskSlice = createSlice({
  name: "task",
  initialState: { data: [] },
  reducers: {
    fetch: (state, action) => {
      state.data = action.payload;
    },
    insertTask: (state, action) => {
      state.data.insert(action.payload);
      state.data = new Heap(state.data.arr, state.data.sortedHeap);
    },
    insertManyTasks: (state, action) => {
      console.time("insertManyTasks");
      state.data.insertMany(action.payload);
      console.timeEnd("insertManyTasks");
      console.time("Reassign heap");
      state.data = new Heap(state.data.arr, state.data.sortedHeap);
      console.timeEnd("Reassign heap");
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
