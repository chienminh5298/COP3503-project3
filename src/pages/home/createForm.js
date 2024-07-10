import React from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
const CreateForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (e) => {
        // Add logic create task here
        toast.success("Task created", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
        reset() // Clear form
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="generalInfo">
                <div className="taskTitle">
                    <label className="title" for="title">
                        Title
                    </label>
                    <input type="text" placeholder="Task title" id="title" {...register("title", { required: true })} />
                </div>
                <div className="taskPriority">
                    <label className="title">Priority</label>
                    <div className="priorityOption">
                        <div>
                            <input type="radio" id="high" name="priority" value={"High"} {...register("priority")} />
                            <label className="priorityLabel" for="high" ầ>
                                High
                            </label>
                        </div>

                        <div>
                            <input type="radio" id="medium" name="priority" value={"Medium"} {...register("priority")} />
                            <label className="priorityLabel" for="medium">
                                Medium
                            </label>
                        </div>
                        <div>
                            <input type="radio" id="standard" name="priority" value={"Standard"} defaultChecked={true} {...register("priority")} />
                            <label className="priorityLabel" for="standard">
                                Standard
                            </label>
                        </div>
                    </div>
                </div>
                <div className="taskSchedule">
                    <label className="title" for="schedule">
                        Exp date
                    </label>
                    <input type="date" id="schedule" {...register("expDate", { required: true })} />
                </div>
            </div>
            <div className="taskDescription">
                <label for="description" className="title">
                    Description
                </label>
                <textarea id="description" {...register("description", { required: true })} />
            </div>
            <button type="submit">Create</button>
        </form>
    );
};

export default CreateForm;
