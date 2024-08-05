import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { taskAction } from "../../storage/taskReducer";
import { createRandomTask, Task } from "../../components/task.js";
const CreateForm = () => {
  const [numRandomTasks, setNumRandomTasks] = useState(100000);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data, event) => {
    const buttonName = event.nativeEvent.submitter.name;
    if (buttonName === "create") {
      const { title, description, dueDate, priority } = data;
      if (!title || !description || !dueDate || !priority) {
        toast.error("Please fill in all fields", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        return;
      }

      const task = new Task(data);
      dispatch(taskAction.insertTask(task));
      toast.success("Task created", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      reset(); // Clear form
    } else {
      const tasks = [];
      for (let i = 0; i < numRandomTasks; i++) {
        tasks.push(createRandomTask());
      }
      dispatch(taskAction.insertManyTasks(tasks));
      toast.success(`Successfully created ${numRandomTasks} tasks`, {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="generalInfo">
        <div className="taskTitle">
          <label className="title" htmlFor="title">
            Title
          </label>
          <input type="text" placeholder="Task title" id="title" {...register("title")} />
        </div>
        <div className="taskPriority">
          <label className="title">Priority</label>
          <div className="priorityOption">
            <div>
              <input type="radio" id="high" name="priority" value={"High"} {...register("priority")} />
              <label className="priorityLabel" htmlFor="high">
                High
              </label>
            </div>

            <div>
              <input type="radio" id="standard" name="priority" value={"Standard"} {...register("priority")} />
              <label className="priorityLabel" htmlFor="standard">
                Standard
              </label>
            </div>
            <div>
              <input type="radio" id="low" name="priority" value={"Low"} defaultChecked={true} {...register("priority")} />
              <label className="priorityLabel" htmlFor="low">
                Low
              </label>
            </div>
          </div>
        </div>
        <div className="taskSchedule">
          <label className="title" htmlFor="schedule">
            Due Date
          </label>
          <input type="date" id="schedule" {...register("dueDate")} />
        </div>
      </div>
      <div className="taskDescription">
        <label htmlFor="description" className="title">
          Description
        </label>
        <textarea id="description" {...register("description")} />
      </div>
      <button type="submit" name="create">
        Create
      </button>
      <button type="submit" name="random">
        Randomly Generate {numRandomTasks} Tasks
      </button>
    </form>
  );
};

export default CreateForm;
