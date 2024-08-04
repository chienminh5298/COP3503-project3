import React from "react";
import { formatDateToYYYYMMDD } from "../../utils/index.js";
import { useForm } from "react-hook-form";

const DetailTask = ({ task }) => {
    // Handle detail task
    const { register, handleSubmit } = useForm();

    const onSubmit = (data, event) => {
        const buttonName = event.nativeEvent.submitter.name;
        if (buttonName === "solve") {
            // Handle save logic here
        } else if (buttonName === "update") {
            // Handle submit logic here
        }
    };

    return (
        <div className="updateTaskContainer">
            <h1>Detail task #{task.id}</h1>
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
                                <input type="radio" id="medium" name="priority" value={"Medium"} defaultChecked={task.priority === "Medium"} {...register("priority")} />
                                <label className="priorityLabel" htmlFor="medium">
                                    Medium
                                </label>
                            </div>
                            <div>
                                <input type="radio" id="standard" name="priority" value={"Standard"} defaultChecked={task.priority === "Standard"} {...register("priority")} />
                                <label className="priorityLabel" htmlFor="standard">
                                    Standard
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="taskSchedule">
                        <label className="title" htmlFor="schedule">
                            Exp date
                        </label>
                        <input type="date" id="schedule" value={formatDateToYYYYMMDD(task.dueDate)} {...register("expDate", { required: true })} />
                    </div>
                </div>
                <div className="taskDescription">
                    <label htmlFor="description" className="title">
                        Description
                    </label>
                    <textarea id="description" value={task.description} {...register("description", { required: true })} />
                </div>
                <div className="footer">
                    <button type="submit" name="update" id="updateButton">
                        Update
                    </button>
                    <button type="submit" name="solve">
                        Solve task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DetailTask;
