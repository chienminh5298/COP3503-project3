import React, { useEffect } from "react";

import "./index.scss";
import { useSelector } from "react-redux";
import { formatDateToMMDDYYYY } from "../../utils";
import CreateForm from "./createForm";

const Home = () => {
    const data = useSelector((state) => state.taskReducer.data.sortedHeap.slice(0, 12));

    useEffect(() => {
        // Sort data by Exp date here
    }, []);

    const renderData = data.map((task) => {
        return (
            <div className="row" key={task.id}>
                <div className="cell title">{task.title}</div>
                <div className="cell">{task.priority}</div>
                <div className="cell">{formatDateToMMDDYYYY(task.createdAt)}</div>
                <div className="cell">{formatDateToMMDDYYYY(task.dueDate)}</div>
            </div>
        );
    });
    return (
        <div className="homeContainer">
            <div className="tableContainer">
                <h1>Top 12 tasks close to Exp date</h1>
                <div className="table">
                    <div className="header">
                        <div className="row">
                            <div className="cell">Title</div>
                            <div className="cell">Priority</div>
                            <div className="cell">Created date</div>
                            <div className="cell">Expired date</div>
                        </div>
                    </div>
                    <div className="body">{renderData}</div>
                </div>
            </div>
            <div className="createTaskContainer">
                <h1>Create a new task</h1>
                <CreateForm />
            </div>
        </div>
    );
};

export default Home;
