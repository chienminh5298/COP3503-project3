import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../components/task";
import { Heap } from "../components/heap";

const taskSlice = createSlice({
  name: "task",
  initialState: { data: [] },
  reducers: {
    fetch: (state, action) => {
      state.data = action.payload;
    },
    createTask: (state, action) => {
      state.data.insert(new Task(action.payload));
      state.data = new Heap(state.data.arr, state.data.sortedHeap);
    },
    resolveTask: (state, action) => {
      let task = action.payload;
      task.setResolved();
      state.data.delete(task);
      state.data = new Heap(state.data.arr, state.data.sortedHeap);
    },
    updateTask: (state, action) => {
      let oldTask = action.payload.task;
      let newTaskData = action.payload.data;
      let newTask = new Task({ ...oldTask.json(), ...newTaskData });
      state.data.updateElement(oldTask, newTask);
      state.data = new Heap(state.data.arr, state.data.sortedHeap);
    },
  },
});

export const taskAction = taskSlice.actions;
export default taskSlice.reducer;
