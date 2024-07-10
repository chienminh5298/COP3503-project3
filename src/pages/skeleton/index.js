import React, { useState } from "react";

import "./index.scss";
import Home from "../home";
import Tasks from "../tasks";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Skeleton = () => {
    const [content, setContent] = useState(<Home />);
    return (
        <div className="skeletonContainer">
            <div className="navBar">
                <button onClick={() => setContent(<Home />)}>Home</button>
                <button onClick={() => setContent(<Tasks />)}>Tasks</button>
            </div>
            <div className="contentContainer">{content}</div>
            <ToastContainer />
        </div>
    );
};

export default Skeleton;
