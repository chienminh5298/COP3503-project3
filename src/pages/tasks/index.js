import React, { useState } from "react";
import "./index.scss";
import { useSelector } from "react-redux";
import { formatDateToYYYYMMDD } from "../../utils";
import TaskDetails from "./taskDetails";

const Tasks = () => {
  const data = useSelector((state) => state.taskReducer.data);
  const sortedHeap = data.sortedHeap;

  // Handle task selection
  const [task, setTask] = useState(sortedHeap.length !== 0 ? sortedHeap[0] : undefined);

  // Handle pagination
  const MAX_PER_PAGE = 15;
  const [page, setPage] = useState(0);
  const pageData = sortedHeap.slice(page * MAX_PER_PAGE, MAX_PER_PAGE * (page + 1));
  const renderData = pageData.map((task) => {
    if (!task.createdAt || !task.dueDate) {
      console.log("task.createdAt or task.dueDate is NULL.");
    }

    return (
      <div className="row" key={task.id} onClick={() => setTask(task)}>
        <div className="cell">{task.id}</div>
        <div className="cell title">{task.title}</div>
        <div className="cell">{task.createdAt ? formatDateToYYYYMMDD(task.createdAt) : "NULL"}</div>
        <div className="cell">{task.priority}</div>
        <div className="cell">{task.dueDate ? formatDateToYYYYMMDD(task.dueDate) : "NULL"}</div>
      </div>
    );
  });

  return (
    <div className="taskContainer">
      <div className="tableContainer">
        <div className="table">
          <div className="header">
            <div className="row">
              <div className="cell">Task ID</div>
              <div className="cell">Title</div>
              <div className="cell">Creation Date</div>
              <div className="cell">Priority</div>
              <div className="cell">Due Date</div>
            </div>
          </div>
          <div className="body">{renderData}</div>
          <div className="footer">
            <div className="pagination">
              <button className="pageButton" onClick={() => page > 0 ? setPage(page - 1) : setPage(Math.ceil(sortedHeap.length / MAX_PER_PAGE) - 1)}>
                Prev
              </button>
              <span>
                {page + 1}/{Math.ceil(sortedHeap.length / MAX_PER_PAGE)}
              </span>
              <button
                className="pageButton"
                onClick={() => page < Math.ceil(sortedHeap.length / MAX_PER_PAGE) - 1 ? setPage(page + 1) : setPage(0)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {task ? <TaskDetails task={task} setTask={setTask} /> : ""}
    </div>
  );
};

export default Tasks;