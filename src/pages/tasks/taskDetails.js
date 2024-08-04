import React, { useEffect } from "react";
import { formatDateToYYYYMMDD } from "../../utils/index.js";
import { useForm } from "react-hook-form";
import { taskAction } from "../../storage/taskReducer.js";
import { useDispatch, useSelector } from "react-redux";

const TaskDetails = ({ task, setTask }) => {
  // Handle detail task
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const heap = useSelector((state) => state.taskReducer.data);

  const onSubmit = (data, event) => {
    const buttonName = event.nativeEvent.submitter.name;
    data.dueDate = new Date(data.dueDate);
    if (buttonName === "resolve") {
      dispatch(taskAction.resolveTask(task));
    } else if (buttonName === "update") {
      dispatch(taskAction.updateTask({ task, data }));
    }
  };

  useEffect(() => {
    reset({
      dueDate: formatDateToYYYYMMDD(task.dueDate),
      description: task.description,
    });
    let newTask = heap.arr[heap.indexOf(task.id)];
    if (newTask) {
      setTask(newTask);
    }
  }, [heap, task]);

  return (
    <div className="updateTaskContainer">
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
                <input type="radio" id="high" name="priority" value={"High"} defaultChecked={task.priority === "High"} {...register("priority")} />
                <label className="priorityLabel" htmlFor="high">
                  High
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="medium"
                  name="priority"
                  value={"Medium"}
                  defaultChecked={task.priority === "Medium"}
                  {...register("priority")}
                />
                <label className="priorityLabel" htmlFor="medium">
                  Medium
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="standard"
                  name="priority"
                  value={"Standard"}
                  defaultChecked={task.priority === "Standard"}
                  {...register("priority")}
                />
                <label className="priorityLabel" htmlFor="standard">
                  Standard
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
          <label htmlFor="description" className="title">
            Description
          </label>
          <textarea id="description" defaultValue={task.description} {...register("description", { required: true })} />
        </div>
        <div className="footer">
          <button type="submit" name="update" id="updateButton" disabled={task.isResolved}>
            {task.isResolved ? "Task Already Completed" : "Update"}
          </button>
          <button type="submit" name="resolve" disabled={task.isResolved}>
            {task.isResolved ? "Resolved" : "Resolve Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskDetails;
