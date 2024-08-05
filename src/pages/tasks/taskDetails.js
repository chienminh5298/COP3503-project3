import React, { useEffect } from "react";
import { formatDateToYYYYMMDD } from "../../utils/index.js";
import { useForm } from "react-hook-form";
import { taskAction } from "../../storage/taskReducer.js";
import { useDispatch, useSelector } from "react-redux";
import { toast, Bounce } from "react-toastify";

const TaskDetails = ({ task, setTask }) => {
  // Handle detail task
  const { register, handleSubmit, reset, setValue } = useForm();
  const dispatch = useDispatch();
  const heap = useSelector((state) => state.taskReducer.data);

  const onSubmit = (data, event) => {
    const buttonName = event.nativeEvent.submitter.name;
    if (buttonName === "resolve") {
      dispatch(taskAction.resolveTask(task));
      toast.success("Task completed!", {
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
    } else if (buttonName === "update") {
      dispatch(taskAction.updateTask({ task, data }));
      toast.success("Task updated!", {
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
    console.log(heap.sortedHeap);
  };

  useEffect(() => {
    let newTask = heap.arr[heap.indexOf(task.id)];
    if (newTask) {
      setTask(newTask);
    }
    setValue("title", task.title);
    setValue("dueDate", formatDateToYYYYMMDD(task.dueDate));
    setValue("description", task.description);
    setValue("priority", task.priority);
  }, [heap, task, setTask, reset, setValue]);

  return (
    <div className={`updateTaskContainer ${task.isResolved ? "taskCompleted" : ""}`}>
      <h1>Task ID: #{task.id}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="generalInfo">
          <div className="taskTitle">
            <label className="title" htmlFor="title">
              Title
            </label>
            <span>{task.title}</span>
          </div>
          <div className="taskPriority">
            <label className="title">Priority</label>
            <div className="priorityOption">
              <div>
                <input type="radio" id="high" name="priority" value="High" defaultChecked={task.priority === "High"} {...register("priority")} />
                <label className="priorityLabel" htmlFor="high">
                  High
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="medium"
                  name="priority"
                  value="Medium"
                  defaultChecked={task.priority === "Medium"}
                  {...register("priority")}
                />
                <label className="priorityLabel" htmlFor="medium">
                  Medium
                </label>
              </div>
              <div>
                <input type="radio" id="low" name="priority" value="Low" defaultChecked={task.priority === "Low"} {...register("priority")} />
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
            <input type="date" id="schedule" defaultValue={formatDateToYYYYMMDD(task.dueDate)} {...register("dueDate", { required: true })} />
          </div>
        </div>
        <div className="taskDescription">
          <label className="title" htmlFor="description">
            Description
          </label>
          <textarea id="description" defaultValue={task.description} {...register("description", { required: true })} />
        </div>
        <div className="footer">
          {!task.isResolved && (
            <button type="submit" name="update" id="updateButton">
              Update
            </button>
          )}
          <button type="submit" name="resolve" disabled={task.isResolved}>
            {task.isResolved ? "Resolved" : "Resolve Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskDetails;
