import React, { useState } from "react";

import "./index.scss";
import { useSelector } from "react-redux";
import { formatDateToMMDDYYYY } from "../../utils";
import DetailTask from "./detailTask";

const Tasks = () => {
    const data = useSelector((state) => state.taskReducer.data);

    // Handle task selection
    const [task, setTask] = useState(data.length !== 0 ? data[0] : undefined);

    // Handle pagination
    const MAX_PER_PAGE = 15;
    const [page, setPage] = useState(0);
    const pageData = data.slice(page * MAX_PER_PAGE, MAX_PER_PAGE * (page + 1));
    const renderData = pageData.map((task) => {
        return (
            <div className="row" key={task.id} onClick={() => setTask(task)}>
                <div className="cell">{task.id}</div>
                <div className="cell title">{task.title}</div>
                <div className="cell">{task.priority}</div>
                <div className="cell">{formatDateToMMDDYYYY(task.createdDate)}</div>
                <div className="cell">{formatDateToMMDDYYYY(task.expDate)}</div>
            </div>
        );
    });

    return (
        <div className="taskContainer">
            <div className="tableContainer">
                <div className="toolbar">
                    <div className="searchContainer">
                        <input id="search" placeholder="Search by id or title" />
                        <button>Searchs</button>
                    </div>
                    <div className="sortContainer">
                        <div>
                            <label>Sort by:</label>
                        </div>
                        <div className="sortOption">
                            <div className="sortOpt">
                                <input type="radio" id="sortPriority" name="sort" checked={true} />
                                <label for="sortPriority">Priority</label>
                            </div>
                            <div>
                                <input type="radio" id="sortExpDate" name="sort" />
                                <label for="sortExpDate">Exp date</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table">
                    <div className="header"></div>
                    <div className="body">{renderData}</div>
                    <div className="footer">
                        <div className="pagination">
                            <button className="pagButton" disabled={page === 0 && true} onClick={() => setPage(page - 1)}>
                                Prev
                            </button>
                            <span>
                                {page + 1}/{Math.ceil(data.length / MAX_PER_PAGE)}
                            </span>
                            <button className="pagButton" disabled={page === Math.ceil(data.length / MAX_PER_PAGE) - 1 && true} onClick={() => setPage(page + 1)}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {task ? <DetailTask task={task} /> : ""}
        </div>
    );
};

export default Tasks;
